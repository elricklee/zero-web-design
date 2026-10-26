const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const crypto = require("node:crypto");

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "leaderboard.json");
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const SEASONS = new Set(["spring", "summer", "autumn", "winter"]);
const MAX_BODY_BYTES = 4096;
const MAX_SCORE = 25000;
const runs = new Map();
const requestBuckets = new Map();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml"
};

function readDatabase() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) return { entries: [] };
  try {
    const database = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    if (!database || !Array.isArray(database.entries)) throw new Error("Invalid leaderboard database shape");
    return database;
  } catch (error) {
    console.error("Unable to read leaderboard database:", error);
    throw new Error("Leaderboard storage is unavailable");
  }
}

function saveDatabase(database) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const temporaryFile = `${DATA_FILE}.${process.pid}.tmp`;
  fs.writeFileSync(temporaryFile, JSON.stringify(database, null, 2), "utf8");
  fs.renameSync(temporaryFile, DATA_FILE);
}

function sendJson(response, status, body) {
  const serialized = JSON.stringify(body);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(serialized),
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "same-origin"
  });
  response.end(serialized);
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error("Request body is too large"), { status: 413 }));
        request.destroy();
        return;
      }
      body += chunk.toString("utf8");
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(Object.assign(new Error("Request body must be valid JSON"), { status: 400 }));
      }
    });
    request.on("error", reject);
  });
}

function allowSubmission(request) {
  const now = Date.now();
  const key = request.socket.remoteAddress || "unknown";
  const recent = (requestBuckets.get(key) || []).filter((time) => now - time < 60_000);
  if (recent.length >= 12) return false;
  recent.push(now);
  requestBuckets.set(key, recent);
  return true;
}

function getSeason(value) {
  return typeof value === "string" && SEASONS.has(value) ? value : null;
}

function handleApi(request, response, url) {
  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, { status: "ok" });
    return;
  }

  const photoSeason = url.pathname.match(/^\/api\/photos\/(spring|summer|autumn|winter)$/)?.[1];
  if (request.method === "GET" && photoSeason) {
    const photoPath = path.join(ROOT, "assets", "seasons", `${photoSeason}.jpg`);
    let available = false;
    try {
      available = fs.statSync(photoPath).isFile();
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    sendJson(response, 200, { season: photoSeason, available });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/leaderboard") {
    const season = getSeason(url.searchParams.get("season"));
    if (!season) {
      sendJson(response, 400, { error: "A valid season is required" });
      return;
    }
    const database = readDatabase();
    const entries = database.entries
      .filter((entry) => entry.season === season)
      .sort((first, second) => second.score - first.score || first.updatedAt.localeCompare(second.updatedAt))
      .slice(0, 20);
    sendJson(response, 200, { season, entries });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/runs") {
    readJsonBody(request).then((body) => {
      const season = getSeason(body.season);
      if (!season) return sendJson(response, 400, { error: "A valid season is required" });
      const runId = crypto.randomUUID();
      runs.set(runId, { season, startedAt: Date.now() });
      sendJson(response, 201, { runId });
    }).catch((error) => sendJson(response, error.status || 400, { error: error.message }));
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/scores") {
    if (!allowSubmission(request)) {
      sendJson(response, 429, { error: "Too many score submissions. Please wait and try again." });
      return;
    }
    readJsonBody(request).then((body) => {
      const run = typeof body.runId === "string" ? runs.get(body.runId) : null;
      const season = getSeason(body.season);
      const name = typeof body.name === "string" ? body.name.normalize("NFC").replace(/[\u0000-\u001f\u007f]/g, "").trim() : "";
      const score = body.score;
      if (!run) return sendJson(response, 400, { error: "Game session is missing, expired, or already submitted" });
      runs.delete(body.runId);
      if (!season || run.season !== season) return sendJson(response, 400, { error: "The submitted season does not match this game" });
      if ([...name].length < 1 || [...name].length > 16) return sendJson(response, 400, { error: "Nickname must contain 1 to 16 characters" });
      if (!Number.isSafeInteger(score) || score < 0 || score > MAX_SCORE) return sendJson(response, 400, { error: "Score is outside the accepted range" });
      const elapsedSeconds = Math.floor((Date.now() - run.startedAt) / 1000);
      if (elapsedSeconds < 3 || score > elapsedSeconds * 200 + 100) {
        return sendJson(response, 400, { error: "Score does not match the duration of this game" });
      }

      const database = readDatabase();
      const playerKey = name.toLocaleLowerCase("zh-CN");
      const existing = database.entries.find((entry) =>
        entry.season === season && entry.name.toLocaleLowerCase("zh-CN") === playerKey
      );
      if (existing) {
        if (score > existing.score) {
          existing.score = score;
          existing.fragments = Math.min(4, Math.floor(score / 125));
          existing.updatedAt = new Date().toISOString();
        }
      } else {
        database.entries.push({
          name,
          season,
          score,
          fragments: Math.min(4, Math.floor(score / 125)),
          updatedAt: new Date().toISOString()
        });
      }
      saveDatabase(database);
      sendJson(response, 201, { accepted: true, message: "Score recorded", season });
    }).catch((error) => sendJson(response, error.status || 400, { error: error.message }));
    return;
  }

  sendJson(response, 404, { error: "API route not found" });
}

function serveStatic(request, response, url) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }
  let requestPath;
  try {
    requestPath = decodeURIComponent(url.pathname);
  } catch {
    sendJson(response, 400, { error: "Invalid request path" });
    return;
  }
  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const resolvedPath = path.resolve(ROOT, relativePath);
  if (!resolvedPath.startsWith(`${ROOT}${path.sep}`)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }
  fs.stat(resolvedPath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      sendJson(response, 404, { error: "File not found" });
      return;
    }
    const headers = {
      "Content-Type": MIME_TYPES[path.extname(resolvedPath).toLowerCase()] || "application/octet-stream",
      "Content-Length": stat.size,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "same-origin"
    };
    response.writeHead(200, headers);
    if (request.method === "HEAD") response.end();
    else fs.createReadStream(resolvedPath).pipe(response);
  });
}

const server = http.createServer((request, response) => {
  const host = request.headers.host || `${HOST}:${PORT}`;
  const url = new URL(request.url, `http://${host}`);
  if (url.pathname.startsWith("/api/")) {
    try {
      handleApi(request, response, url);
    } catch (error) {
      console.error("API request failed:", error);
      sendJson(response, 500, { error: "The leaderboard service could not complete this request" });
    }
    return;
  }
  serveStatic(request, response, url);
});

server.listen(PORT, HOST, () => {
  console.log(`珞珈拾光已启动：http://${HOST}:${PORT}`);
  console.log("排行榜由本机 Node 服务保存至 data/leaderboard.json。");
});

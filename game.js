(() => {
  const STORAGE_KEY = "luojia-memory-game-v1";
  const LEVELS = [
    { name: "樱花花瓣", icon: "🌸", radius: 17, points: 2, color: "#f4d3cf", place: "樱顶与樱花城堡", description: "一瓣春樱，落在珞珈山的青瓦上。武大的春天，就从一场轻盈的相遇开始。" },
    { name: "银杏叶", icon: "🍃", radius: 22, points: 5, color: "#e4e9c3", place: "桂园小路", description: "拾一片银杏叶，把秋日的金色也收进珞珈的记忆。" },
    { name: "珞珈书页", icon: "📖", radius: 28, points: 12, color: "#ead6af", place: "老图书馆", description: "翻开一页珞珈旧时光，飞檐斗拱间仍有朗朗书声。" },
    { name: "校徽印记", icon: "🎐", radius: 34, points: 24, color: "#d8e2d5", place: "武汉大学校门", description: "把珞珈山水与百年学府的印记，一起珍藏。" },
    { name: "老图书馆", icon: "🏛️", radius: 40, points: 48, color: "#e6cbb2", place: "樱顶老图书馆", description: "飞檐映着樱花，老图书馆静静讲述着武大的春日故事。" },
    { name: "樱花大道", icon: "🌳", radius: 46, points: 90, color: "#d5e3cb", place: "樱花大道", description: "沿樱花大道慢慢走，花瓣落在肩头，也落进来往的脚步里。" },
    { name: "珞珈山色", icon: "⛰️", radius: 52, points: 160, color: "#d8ddc3", place: "珞珈山", description: "湖光、山影与校园建筑相映成画。转过一个弯，珞珈总有新的模样。" },
    { name: "珞珈春景", icon: "✨", radius: 58, points: 300, color: "#f0dcab", place: "珞珈春日", description: "八段校园记忆，在这一刻拼成完整的珞珈春日。愿你常回珞珈看看。" }
  ];
  const FRAGMENTS = [
    { title: "樱顶春信", place: "樱顶 · 老图书馆", thresholds: [50, 150, 300, 500], quote: "在珞珈，读一场花开的信。", description: "春风经过珞珈山，先把一树一树的樱花唤醒。樱顶的老图书馆静静立在花影深处，青瓦与飞檐之间，藏着武大悠长的书香与春日。", sky: "#e9c7b0", hill: "#617e63" },
    { title: "樱花大道", place: "樱花大道 · 人文路", thresholds: [700, 950, 1250, 1600], quote: "走过花下，也走进春天。", description: "沿着樱花大道慢慢走，花瓣落在肩头，也落在来往的脚步里。这里的春天不只属于某一处风景，更属于每一位与花期不期而遇的人。", sky: "#e4d6bd", hill: "#658466" },
    { title: "珞珈山色", place: "珞珈山 · 万林艺术博物馆", thresholds: [2000, 2400, 2850, 3300], quote: "山水有相逢，珞珈总有新一面。", description: "珞珈山的绿意从校园深处漫开，湖光、山影与建筑相映成画。走出课堂，沿山径转一个弯，熟悉的校园也会露出新的模样。", sky: "#dfd0b8", hill: "#536f60" }
  ];
  const DEMO_RANKS = [
    ["珞珈听雨", 1680], ["樱顶来信", 1420], ["山水有珈", 1180], ["晚风书页", 960], ["珞珈新友", 780]
  ];
  const W = 520;
  const H = 610;
  const LEFT = 31;
  const RIGHT = W - 31;
  const FLOOR = H - 25;
  const canvas = document.querySelector("#game-canvas");
  const ctx = canvas.getContext("2d");
  const overlay = document.querySelector("#game-overlay");
  const startButton = document.querySelector("#start-button");
  const modal = document.querySelector("#modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalKicker = document.querySelector("#modal-kicker");
  const modalContent = document.querySelector("#modal-content");
  const toast = document.querySelector("#toast");
  let profile = loadProfile();
  let balls = [];
  let currentX = W / 2;
  let nextLevel = 0;
  let active = false;
  let paused = false;
  let score = 0;
  let merges = 0;
  let highestLevel = 0;
  let energy = 0;
  let remaining = 120;
  let previousFrame = 0;
  let cooldown = 0;
  let animationFrame = 0;
  let toastTimeout = 0;
  let journalPage = 0;
  let lastFocus = null;
  let muted = false;
  let audioContext = null;

  function loadProfile() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        lifetimeScore: Number.isFinite(saved.lifetimeScore) ? Math.max(0, saved.lifetimeScore) : 0,
        bestScore: Number.isFinite(saved.bestScore) ? Math.max(0, saved.bestScore) : 0,
        bestLevel: Number.isInteger(saved.bestLevel) ? Math.max(0, Math.min(7, saved.bestLevel)) : 0,
        rankings: Array.isArray(saved.rankings) ? saved.rankings.filter((item) =>
          item && typeof item.name === "string" && Number.isFinite(item.score)
        ) : []
      };
    } catch (error) {
      console.error("无法读取珞珈拾光的本地进度。", error);
      return { lifetimeScore: 0, bestScore: 0, bestLevel: 0, rankings: [] };
    }
  }

  function saveProfile() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error("无法保存珞珈拾光的本地进度。", error);
      showToast("本机存档暂时不可用，请勿关闭页面。");
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function unlockedFragments() {
    return FRAGMENTS.reduce((count, page) =>
      count + page.thresholds.filter((scoreThreshold) => profile.lifetimeScore >= scoreThreshold).length, 0);
  }

  function renderProfile() {
    document.querySelector("#best-score").textContent = profile.bestScore.toLocaleString("zh-CN");
    document.querySelector("#lifetime-score").textContent = profile.lifetimeScore.toLocaleString("zh-CN");
    document.querySelector("#fragment-badge").textContent = unlockedFragments();
    document.querySelector("#journal-progress").style.width = `${(unlockedFragments() / 12) * 100}%`;
    document.querySelector("#discovered-count").textContent = `已发现 ${profile.bestLevel + 1} / ${LEVELS.length}`;
    document.querySelector("#highest-merge").textContent = LEVELS[highestLevel].name;
    renderRing();
  }

  function renderRing() {
    const ring = document.querySelector("#evolution-ring");
    const radius = 42;
    ring.innerHTML = LEVELS.map((level, index) => {
      const angle = ((index * 360) / LEVELS.length - 90) * Math.PI / 180;
      const left = 50 + Math.cos(angle) * radius;
      const top = 50 + Math.sin(angle) * radius;
      const locked = index > profile.bestLevel;
      return `<button type="button" class="ring-item ${locked ? "is-locked" : ""}" style="left:${left}%;top:${top}%" data-level="${index}" aria-label="${level.name}${locked ? "，尚未发现" : "，已发现"}">${locked ? "?" : level.icon}</button>`;
    }).join("");
  }

  function openModal(type) {
    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (type === "journal") {
      journalPage = 0;
      renderJournal();
    } else if (type === "rank") {
      renderRank();
    } else if (type === "encyclopedia") {
      renderEncyclopedia();
    } else if (type === "help") {
      modalKicker.textContent = "HOW TO PLAY";
      modalTitle.textContent = "珞珈漫游指南";
      modalContent.innerHTML = `<ol class="help-list">
        <li>移动鼠标或手指，选择记忆落下的位置；点击投放。</li>
        <li>两个相同的校园元素相遇，会合成更高一级的记忆。</li>
        <li>融合获得分数与共鸣能量；能量充满后点击左侧「春风拂落」清理两枚低级元素。</li>
        <li>每局两分钟，暂停或容器堆满时结算；累计积分会解锁珞珈手札碎片。</li>
      </ol>`;
    }
    document.querySelector("#modal-close").focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function renderJournal() {
    const page = FRAGMENTS[journalPage];
    const unlocked = page.thresholds.filter((threshold) => profile.lifetimeScore >= threshold).length;
    const nextThreshold = page.thresholds.find((threshold) => profile.lifetimeScore < threshold);
    const pieces = page.thresholds.map((threshold, index) => {
      const isUnlocked = profile.lifetimeScore >= threshold;
      return `<div class="puzzle-piece ${isUnlocked ? "is-open" : ""}"><span>${isUnlocked ? "✦" : `0${index + 1}`}</span><span>${isUnlocked ? "已收集" : `${threshold} 分`}</span></div>`;
    }).join("");
    modalKicker.textContent = "THE LUOJIA JOURNAL";
    modalTitle.textContent = "珞珈手札";
    modalContent.innerHTML = `<div class="book-layout">
      <div class="book-picture" style="background:linear-gradient(180deg,${page.sky} 0%,#f1e3ca 52%,#9fb49b 52%,#66816a 100%)">
        <span class="book-hill" style="background:${page.hill}"></span>
        <span class="book-building"></span><span class="book-tree"></span><span class="book-tree tree-right"></span>
        <div class="fragment-puzzle">${pieces}</div>
      </div>
      <article class="book-copy">
        <div class="book-page-number"><span>PAGE 0${journalPage + 1}</span><span>MEMORY FRAGMENTS</span></div>
        <h3>${page.place}</h3><p>${page.description}</p><div class="book-quote">${page.quote}</div>
        <div class="book-status">已拼合 ${unlocked} / 4 片${nextThreshold ? ` · 再得 ${nextThreshold - profile.lifetimeScore} 分，解锁下一片` : " · 本页风景已完整拼合"}</div>
      </article>
    </div>
    <div class="book-nav"><button type="button" data-page="-1" ${journalPage === 0 ? "disabled" : ""}>← 上一页</button><span>${String(journalPage + 1).padStart(2, "0")} / 03</span><button type="button" data-page="1" ${journalPage === FRAGMENTS.length - 1 ? "disabled" : ""}>下一页 →</button></div>`;
  }

  function ranks() {
    const all = DEMO_RANKS.map(([name, value]) => ({ name, score: value }));
    if (profile.bestScore > 0) all.push({ name: "珞珈新友 · 你", score: profile.bestScore, you: true });
    profile.rankings.forEach((entry) => all.push({ name: entry.name, score: entry.score, you: true }));
    const unique = new Map();
    all.forEach((entry) => {
      const key = entry.you ? "you" : entry.name;
      if (!unique.has(key) || unique.get(key).score < entry.score) unique.set(key, entry);
    });
    return [...unique.values()].sort((a, b) => b.score - a.score).slice(0, 8);
  }

  function renderRank() {
    modalKicker.textContent = "THE LUOJIA WALKERS";
    modalTitle.textContent = "珞珈拾光榜";
    const rows = ranks().map((entry, index) => `<tr class="${entry.you ? "is-you" : ""}">
      <td>${String(index + 1).padStart(2, "0")}</td><td>${entry.name}</td>
      <td>${entry.score.toLocaleString("zh-CN")}</td><td>${Math.min(12, Math.floor(entry.score / 250))} 片</td>
    </tr>`).join("");
    modalContent.innerHTML = `<table class="rank-table"><thead><tr><th>名次</th><th>漫游者</th><th>最高记录</th><th>已收集</th></tr></thead><tbody>${rows}</tbody></table><p class="rank-disclaimer">本机演示榜 · 成绩保存在当前浏览器，不代表线上比赛排行。</p>`;
  }

  function renderEncyclopedia() {
    modalKicker.textContent = "MEMORY EVOLUTION";
    modalTitle.textContent = "校园融合图鉴";
    modalContent.innerHTML = `<div class="encyclopedia-grid">${LEVELS.map((level, index) => {
      const locked = index > profile.bestLevel;
      return `<button type="button" class="encyclopedia-entry ${locked ? "is-locked" : ""}" data-level="${index}">
        <span>${locked ? "?" : level.icon}</span><strong>${locked ? "待发现" : level.name}</strong><small>NO. 0${index + 1}</small>
      </button>`;
    }).join("")}</div>`;
  }

  function renderEntry(index) {
    const level = LEVELS[index];
    const locked = index > profile.bestLevel;
    modalKicker.textContent = `MEMORY 0${index + 1} · FIELD NOTES`;
    modalTitle.textContent = locked ? "尚未发现的校园记忆" : level.name;
    modalContent.innerHTML = `<div class="entry-detail"><span class="entry-detail-icon">${locked ? "?" : level.icon}</span><div>
      <h3>${locked ? "再完成一次融合，发现新的校园记忆。" : level.place}</h3>
      <p>${locked ? "融合相同等级的校园元素，逐步解锁完整图鉴。" : level.description}</p>
      <button type="button" id="encyclopedia-back">← 返回融合图鉴</button>
    </div></div>`;
  }

  function formatTime(value) {
    return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(Math.floor(value % 60)).padStart(2, "0")}`;
  }

  function updateTimer() {
    document.querySelector("#timer").textContent = formatTime(remaining);
  }

  function updateEnergy() {
    document.querySelector("#energy-label").textContent = `${Math.min(energy, 5)} / 5`;
    document.querySelector("#energy-fill").style.width = `${Math.min(energy, 5) * 20}%`;
    document.querySelector("#skill-button").disabled = !active || paused || energy < 5;
  }

  function startGame() {
    balls = [];
    score = 0;
    merges = 0;
    highestLevel = 0;
    energy = 0;
    remaining = 120;
    nextLevel = Math.random() < .76 ? 0 : 1;
    currentX = W / 2;
    cooldown = 0;
    active = true;
    paused = false;
    previousFrame = 0;
    overlay.classList.add("is-hidden");
    document.querySelector("#game-status").textContent = "准备好开始漫游";
    document.querySelector("#pause-button").textContent = "Ⅱ";
    document.querySelector("#pause-button").setAttribute("aria-label", "暂停游戏");
    document.querySelector("#score").textContent = "0";
    document.querySelector("#merge-count").textContent = "0";
    document.querySelector("#highest-merge").textContent = LEVELS[0].name;
    updateNextPiece();
    updateEnergy();
    updateTimer();
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(tick);
  }

  function endGame(reason) {
    if (!active) return;
    active = false;
    paused = false;
    profile.bestScore = Math.max(profile.bestScore, score);
    profile.bestLevel = Math.max(profile.bestLevel, highestLevel);
    if (score > 0) {
      profile.rankings.push({ name: "珞珈新友 · 你", score });
      profile.rankings.sort((a, b) => b.score - a.score);
      profile.rankings = profile.rankings.slice(0, 8);
    }
    saveProfile();
    renderProfile();
    document.querySelector("#game-status").textContent = "本局拾光已收进手札";
    document.querySelector("#pause-button").textContent = "↻";
    document.querySelector("#pause-button").setAttribute("aria-label", "重新开始游戏");
    document.querySelector("#overlay-title").textContent = `这一局，拾光 ${score.toLocaleString("zh-CN")} 分`;
    document.querySelector("#overlay-copy").innerHTML = `${reason}<br>你的珞珈手札已经收集 ${unlockedFragments()} / 12 片记忆。`;
    startButton.innerHTML = '再漫游一局 <span>→</span>';
    overlay.classList.remove("is-hidden");
    updateEnergy();
  }

  function pauseGame() {
    if (!active) {
      startGame();
      return;
    }
    paused = !paused;
    if (paused) {
      document.querySelector("#game-status").textContent = "春日漫游已暂停";
      document.querySelector("#pause-button").textContent = "▶";
      document.querySelector("#pause-button").setAttribute("aria-label", "继续游戏");
      document.querySelector("#overlay-title").textContent = "歇一歇，再继续拾光。";
      document.querySelector("#overlay-copy").innerHTML = `已收集 ${score} 分珞珈记忆。<br>这一页会为你留在这里。`;
      startButton.innerHTML = '继续这一局 <span>→</span>';
      overlay.classList.remove("is-hidden");
      cancelAnimationFrame(animationFrame);
    } else {
      document.querySelector("#game-status").textContent = "珞珈春日漫游中";
      document.querySelector("#pause-button").textContent = "Ⅱ";
      document.querySelector("#pause-button").setAttribute("aria-label", "暂停游戏");
      overlay.classList.add("is-hidden");
      previousFrame = 0;
      animationFrame = requestAnimationFrame(tick);
    }
    updateEnergy();
  }

  function updateNextPiece() {
    document.querySelector("#next-icon").textContent = LEVELS[nextLevel].icon;
    document.querySelector("#next-name").textContent = LEVELS[nextLevel].name;
    document.querySelector("#next-icon-large").textContent = LEVELS[nextLevel].icon;
    document.querySelector("#next-name-large").textContent = LEVELS[nextLevel].name;
  }

  function drop() {
    if (!active || paused || cooldown > 0) return;
    const radius = LEVELS[nextLevel].radius;
    const x = Math.max(LEFT + radius, Math.min(RIGHT - radius, currentX));
    balls.push({ level: nextLevel, x, y: 62 + radius, vx: (Math.random() - .5) * 8, vy: 5, radius, age: 0, overflow: 0, alive: true });
    nextLevel = Math.random() < .76 ? 0 : 1;
    updateNextPiece();
    cooldown = .29;
    playTone(460, .055);
  }

  function merge(a, b) {
    if (!a.alive || !b.alive || a.level !== b.level || a.level >= LEVELS.length - 1) return false;
    a.alive = false;
    b.alive = false;
    const level = a.level + 1;
    const radius = LEVELS[level].radius;
    const x = (a.x + b.x) / 2;
    const y = (a.y + b.y) / 2;
    balls.push({ level, x: Math.max(LEFT + radius, Math.min(RIGHT - radius, x)), y, vx: (Math.random() - .5) * 30, vy: -Math.min(85, radius * 1.55), radius, age: 0, overflow: 0, alive: true });
    merges += 1;
    highestLevel = Math.max(highestLevel, level);
    score += LEVELS[level].points;
    profile.lifetimeScore += LEVELS[level].points;
    energy = Math.min(5, energy + 1);
    document.querySelector("#score").textContent = score.toLocaleString("zh-CN");
    document.querySelector("#merge-count").textContent = merges;
    document.querySelector("#highest-merge").textContent = LEVELS[highestLevel].name;
    profile.bestLevel = Math.max(profile.bestLevel, highestLevel);
    renderProfile();
    updateEnergy();
    playTone(540 + level * 45, .11);
    if (level === LEVELS.length - 1) showToast("珞珈春景融合成功！新的记忆已经收进图鉴。");
    return true;
  }

  function physics(delta) {
    const step = Math.min(delta, .04);
    balls.forEach((ball) => {
      if (!ball.alive) return;
      ball.age += step;
      ball.vy = Math.min(680, ball.vy + 850 * step);
      ball.x += ball.vx * step;
      ball.y += ball.vy * step;
      ball.vx *= Math.pow(.994, step * 60);
      if (ball.x - ball.radius < LEFT) { ball.x = LEFT + ball.radius; ball.vx = Math.abs(ball.vx) * .48; }
      if (ball.x + ball.radius > RIGHT) { ball.x = RIGHT - ball.radius; ball.vx = -Math.abs(ball.vx) * .48; }
      if (ball.y + ball.radius > FLOOR) {
        ball.y = FLOOR - ball.radius;
        if (ball.vy > 40) ball.vy *= -.24;
        else ball.vy = 0;
        ball.vx *= .91;
      }
      if (ball.y - ball.radius < 77 && ball.age > 2 && Math.abs(ball.vy) < 36) ball.overflow += step;
      else ball.overflow = Math.max(0, ball.overflow - step * 2);
    });
    for (let i = 0; i < balls.length; i += 1) {
      const a = balls[i];
      if (!a.alive) continue;
      for (let j = i + 1; j < balls.length; j += 1) {
        const b = balls[j];
        if (!b.alive) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.hypot(dx, dy) || .001;
        const minimum = a.radius + b.radius;
        if (distance >= minimum) continue;
        if (a.level === b.level && a.level < LEVELS.length - 1) { merge(a, b); continue; }
        const nx = dx / distance;
        const ny = dy / distance;
        const overlap = minimum - distance;
        a.x -= nx * overlap * .5; a.y -= ny * overlap * .5;
        b.x += nx * overlap * .5; b.y += ny * overlap * .5;
        const velocity = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
        if (velocity < 0) {
          a.vx += velocity * .22 * nx; a.vy += velocity * .22 * ny;
          b.vx -= velocity * .22 * nx; b.vy -= velocity * .22 * ny;
        }
      }
    }
    balls = balls.filter((ball) => ball.alive);
    if (balls.some((ball) => ball.overflow > 2.3)) endGame("容器快满啦，先把收集到的春天收好。");
  }

  function drawBall(ball) {
    const def = LEVELS[ball.level];
    ctx.save();
    ctx.shadowColor = "rgba(53,83,52,.18)";
    ctx.shadowBlur = 7;
    ctx.shadowOffsetY = 3;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = def.color;
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,249,.95)";
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${Math.max(15, ball.radius * 1.05)}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
    ctx.fillText(def.icon, ball.x, ball.y + 1);
    ctx.restore();
  }

  function drawBackground() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(240,247,224,.17)";
    ctx.fillRect(LEFT, 53, RIGHT - LEFT, FLOOR - 53);
    ctx.strokeStyle = "rgba(71,113,77,.10)";
    ctx.lineWidth = 1;
    for (let y = 99; y < FLOOR; y += 36) {
      ctx.beginPath(); ctx.moveTo(LEFT + 2, y); ctx.lineTo(RIGHT - 2, y); ctx.stroke();
    }
    ctx.fillStyle = "rgba(249,251,230,.55)";
    ctx.fillRect(LEFT, 52, 3, FLOOR - 52);
    ctx.fillRect(RIGHT - 3, 52, 3, FLOOR - 52);
    ctx.fillStyle = "rgba(102,125,86,.37)";
    ctx.fillRect(LEFT, FLOOR, RIGHT - LEFT, 4);
    ctx.fillStyle = "rgba(72,109,77,.5)";
    ctx.font = "9px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("L U O J I A   M E M O R I E S", W / 2, H - 8);
  }

  function draw() {
    const bounds = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.round(bounds.width * dpr);
    const pixelHeight = Math.round(bounds.height * dpr);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    ctx.setTransform(pixelWidth / W, 0, 0, pixelHeight / H, 0, 0);
    drawBackground();
    if (active && !paused) {
      const radius = LEVELS[nextLevel].radius;
      const x = Math.max(LEFT + radius, Math.min(RIGHT - radius, currentX));
      ctx.save();
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = "rgba(70,109,79,.37)";
      ctx.beginPath(); ctx.moveTo(x, 54); ctx.lineTo(x, FLOOR - 4); ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = .76;
      drawBall({ level: nextLevel, x, y: 58 + radius, radius });
      ctx.restore();
    }
    balls.forEach(drawBall);
  }

  function tick(timestamp) {
    if (!active || paused) return;
    if (!previousFrame) previousFrame = timestamp;
    const delta = Math.min((timestamp - previousFrame) / 1000, .05);
    previousFrame = timestamp;
    cooldown = Math.max(0, cooldown - delta);
    remaining = Math.max(0, remaining - delta);
    updateTimer();
    if (remaining <= 0) {
      draw();
      endGame("春日漫游时间到，看看你为珞珈收集了多少记忆。");
      return;
    }
    physics(delta);
    draw();
    if (active) animationFrame = requestAnimationFrame(tick);
  }

  function clearLowest() {
    if (!active || paused || energy < 5) return;
    energy -= 5;
    const lowest = [...balls].sort((a, b) => a.level - b.level).slice(0, 2);
    lowest.forEach((ball) => { ball.alive = false; });
    balls = balls.filter((ball) => ball.alive);
    updateEnergy();
    draw();
    showToast(lowest.length ? "春风拂过，整理了两枚最初的记忆。" : "场上还没有需要整理的记忆。");
  }

  function playTone(frequency, duration) {
    if (muted) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioContext) audioContext = new AudioContextClass();
      if (audioContext.state === "suspended") audioContext.resume();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(.035, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.error("音效播放失败。", error);
    }
  }

  function setPointer(event) {
    const bounds = canvas.getBoundingClientRect();
    currentX = (event.clientX - bounds.left) / bounds.width * W;
  }

  canvas.addEventListener("pointermove", (event) => { setPointer(event); if (active && !paused) draw(); });
  canvas.addEventListener("pointerdown", (event) => { event.preventDefault(); setPointer(event); drop(); draw(); });
  startButton.addEventListener("click", () => paused ? pauseGame() : startGame());
  document.querySelector("#pause-button").addEventListener("click", pauseGame);
  document.querySelector("#restart-button").addEventListener("click", startGame);
  document.querySelector("#skill-button").addEventListener("click", clearLowest);
  document.querySelector("#open-journal").addEventListener("click", () => openModal("journal"));
  document.querySelector("#journal-card").addEventListener("click", () => openModal("journal"));
  document.querySelector("#open-rank").addEventListener("click", () => openModal("rank"));
  document.querySelector("#rank-card").addEventListener("click", () => openModal("rank"));
  document.querySelector("#open-encyclopedia").addEventListener("click", () => openModal("encyclopedia"));
  document.querySelector("#help-button").addEventListener("click", () => openModal("help"));
  document.querySelector("#sound-button").addEventListener("click", (event) => {
    muted = !muted;
    event.currentTarget.setAttribute("aria-label", muted ? "开启音效" : "关闭音效");
    event.currentTarget.querySelector("small").textContent = muted ? "静音" : "音效";
    showToast(muted ? "音效已关闭。" : "音效已开启。");
  });
  document.querySelector("#modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-close-modal")) closeModal();
    const pageButton = event.target.closest("[data-page]");
    if (pageButton && !pageButton.disabled) {
      journalPage += Number(pageButton.dataset.page);
      renderJournal();
    }
    const levelButton = event.target.closest("[data-level]");
    if (levelButton) renderEntry(Number(levelButton.dataset.level));
    if (event.target.id === "encyclopedia-back") renderEncyclopedia();
  });
  document.querySelector("#evolution-ring").addEventListener("click", (event) => {
    const button = event.target.closest("[data-level]");
    if (button) { openModal("encyclopedia"); renderEntry(Number(button.dataset.level)); }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    if (event.code === "Space" && active && !paused && !modal.classList.contains("is-open") && document.activeElement.tagName !== "BUTTON") {
      event.preventDefault(); drop();
    }
    if (event.key.toLowerCase() === "q" && active && !paused && !modal.classList.contains("is-open")) clearLowest();
    if (event.code === "ArrowLeft" && active && !paused) currentX = Math.max(LEFT + 20, currentX - 18);
    if (event.code === "ArrowRight" && active && !paused) currentX = Math.min(RIGHT - 20, currentX + 18);
  });
  window.addEventListener("resize", draw);

  renderProfile();
  updateNextPiece();
  updateTimer();
  draw();
})();

(() => {
  const STORAGE_KEY = "luojia-memory-game-v1";
  const SEASON_KEY = "luojia-memory-season-v1";
  const SEASONS = {
    spring: {
      name: "春", adjective: "春日", emoji: "🌸", caption: "SPRING MEMORY", motto: "✿　珞珈春信　✿　樱顶花开　✿　珞珈春信　✿　樱花漫过珞珈山",
      title: "珞珈山下，春日正好。", subtitle: "把春日，轻轻放进珞珈", fragmentTitle: "樱顶春信",
      place: "樱顶 · 老图书馆", quote: "在珞珈，读一场花开的信。",
      description: "春风经过珞珈山，先把一树一树的樱花唤醒。樱顶的老图书馆静静立在花影深处，青瓦与飞檐之间，藏着武大悠长的书香与春日。",
      photo: "assets/seasons/spring.jpg", thresholds: [50, 150, 300, 500], levels: [
        ["樱花花瓣","🌸","#f4d3cf","一瓣春樱，落在珞珈山的青瓦上。"],
        ["初绽新叶","🌱","#dce9c7","嫩芽探出枝头，春天从第一抹新绿开始。"],
        ["珞珈书页","📖","#ead6af","翻开一页珞珈旧时光，听飞檐下的书声。"],
        ["樱顶飞檐","🏯","#e6d6c1","樱花映着飞檐，收进珞珈的春日记忆。"],
        ["樱花树影","🌸","#ebced0","一树花影，落在老图书馆的石阶前。"],
        ["樱花大道","🌳","#d5e3cb","沿樱花大道慢慢走，花瓣也落进脚步里。"],
        ["珞珈春山","⛰️","#cbd9bd","山色与花海相映，春天漫过整座校园。"],
        ["珞珈春景","✨","#f0dcab","八段记忆相遇，拼成一场完整的珞珈春日。"]
      ]
    },
    summer: {
      name: "夏", adjective: "夏日", emoji: "☀️", caption: "SUMMER MEMORY", motto: "☀　珞珈夏日　☀　荷风送凉　☀　珞珈夏日　☀　湖光映着浓荫",
      title: "珞珈树深，夏日正长。", subtitle: "把夏日，收藏在浓荫之间", fragmentTitle: "荷风夏信",
      place: "东湖 · 荷塘", quote: "风过荷塘，正好是珞珈的夏天。",
      description: "夏日的珞珈绿荫浓密，荷叶在湖面舒展，知了声从树梢传来。沿着东湖边慢慢走，阳光穿过枝叶，落下一路斑驳的光影。",
      photo: "assets/seasons/summer.jpg", thresholds: [50, 150, 300, 500], levels: [
        ["新荷尖角","🪷","#d8e8c6","荷尖刚刚探出水面，夏天也刚刚开始。"],
        ["梧桐浓荫","🌿","#c9dfc6","梧桐浓荫为珞珈的午后留下一片清凉。"],
        ["湖畔书页","📖","#d8e6d9","带一本书到湖边，在树影里读过悠长夏日。"],
        ["夏日晴窗","🪟","#d9e5ce","阳光落在窗沿，教室里也有夏日的回声。"],
        ["荷塘月色","🪷","#c5e1d2","满塘荷叶摇曳，送来一缕清凉的湖风。"],
        ["东湖光影","🌊","#b9dce0","东湖映着天光，绿荫一路延伸到远方。"],
        ["珞珈夏山","⛰️","#b9d5c0","山色被浓绿染透，珞珈在盛夏里静静呼吸。"],
        ["珞珈夏景","☀️","#f1d88e","八段夏日记忆，汇成一幅明亮的珞珈夏景。"]
      ]
    },
    autumn: {
      name: "秋", adjective: "秋日", emoji: "🍂", caption: "AUTUMN MEMORY", motto: "🍂　珞珈秋意　🍂　银杏铺金　🍂　珞珈秋意　🍂　晚风吹过桂园",
      title: "银杏铺金，珞珈知秋。", subtitle: "把秋色，收进一片银杏叶", fragmentTitle: "桂园秋笺",
      place: "桂园 · 银杏大道", quote: "拾一片金黄，寄给珞珈的秋天。",
      description: "秋风吹过桂园，银杏叶渐渐染成金黄。走在落叶铺成的小路上，桂花香从墙边飘来，珞珈的秋天总有恰好的温柔。",
      photo: "assets/seasons/autumn.jpg", thresholds: [50, 150, 300, 500], levels: [
        ["银杏初黄","🍂","#efcf8b","第一片银杏叶变黄，悄悄提醒珞珈入秋。"],
        ["桂花香气","🌼","#f0d9a1","桂花香飘过墙角，秋日也有甜甜的回忆。"],
        ["秋日书页","📖","#e7d0a7","翻开秋日的一页，让金色停留在字里行间。"],
        ["金叶书签","📜","#e8c992","把银杏叶夹进书页，做成一枚珞珈书签。"],
        ["桂园金道","🌳","#dfb86f","金黄叶片铺满小径，桂园迎来最美的时节。"],
        ["秋湖倒影","🌊","#c9b477","湖面映着斑斓树影，秋水也变得温柔。"],
        ["珞珈秋山","⛰️","#c59d67","山色层层染秋，风里带着桂花的香气。"],
        ["珞珈秋景","🍁","#e7b86b","八段秋日记忆，拼成一幅珞珈金秋。"]
      ]
    },
    winter: {
      name: "冬", adjective: "冬日", emoji: "❄️", caption: "WINTER MEMORY", motto: "❄　珞珈冬日　❄　雪落老斋舍　❄　珞珈冬日　❄　湖面静静映雪",
      title: "雪落珞珈，冬日有信。", subtitle: "把冬天，留在一场初雪里", fragmentTitle: "初雪冬信",
      place: "老斋舍 · 樱顶雪径", quote: "雪落无声，珞珈仍有温暖回响。",
      description: "冬雪落在老斋舍的屋檐与樱顶的石阶，校园安静下来。捧一杯热茶，沿着熟悉的小路慢慢走，白色的珞珈也有暖意。",
      photo: "assets/seasons/winter.jpg", thresholds: [50, 150, 300, 500], levels: [
        ["初雪晶花","❄️","#dcecf4","雪花落在掌心，冬天写下第一封来信。"],
        ["冬日松果","🌰","#d6e3df","松枝间藏着冬日的小小馈赠。"],
        ["暖冬书页","📖","#d9e5e9","翻开书页，窗外的冬雪让字句更加安静。"],
        ["雪中飞檐","🏯","#d6e2eb","白雪落在飞檐，老建筑有了新的轮廓。"],
        ["冬青树影","🌲","#c8dfdf","冬青仍然常绿，为雪色添上一抹深深的绿。"],
        ["樱顶雪径","🏛️","#dae4e9","沿樱顶石阶而上，脚下是珞珈的第一场雪。"],
        ["珞珈雪山","⛰️","#c5d8e3","山峦覆雪，远处湖水映出冬日的天空。"],
        ["珞珈冬景","❄️","#d7eaf0","八段冬日记忆，汇成一幅静谧的珞珈雪景。"]
      ]
    }
  };
  const PHYSICS = [
    { radius: 17, points: 2 }, { radius: 22, points: 5 }, { radius: 28, points: 12 }, { radius: 34, points: 24 },
    { radius: 40, points: 48 }, { radius: 46, points: 90 }, { radius: 52, points: 160 }, { radius: 58, points: 300 }
  ];
  const SKILLS = [
    { id: "clear", name: "春风拂落", icon: "✧", cost: 5, description: "清理场上最低级的两枚记忆", detail: "清理最低级的两枚元素，为场地腾出空间。" },
    { id: "lift", name: "樱雨回旋", icon: "❋", cost: 4, description: "轻轻托起场上所有记忆", detail: "给场上所有元素一股向上的气流，打散拥挤堆叠。" },
    { id: "time", name: "珞珈晨曦", icon: "☼", cost: 5, description: "为漫游增加 15 秒", detail: "消耗共鸣，为本局增加 15 秒漫游时间。" }
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
  const gameScreen = document.querySelector(".game-screen");
  let currentSeason = loadSeason();
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
  let selectedSkill = "clear";
  let runId = null;
  let runEpoch = 0;
  let leaderboardEntries = [];
  let leaderboardError = "";
  let seasonNoticeTimeout = 0;
  let pendingSeason = null;
  let pausedForSeasonPrompt = false;
  const photoAvailability = {};

  function loadSeason() {
    try {
      const saved = localStorage.getItem(SEASON_KEY);
      return saved && SEASONS[saved] ? saved : "spring";
    } catch (error) {
      console.error("无法读取所选季节。", error);
      return "spring";
    }
  }

  function loadProfile() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const seasonProgress = {};
      Object.keys(SEASONS).forEach((season) => {
        const progress = saved.seasonProgress && saved.seasonProgress[season];
        seasonProgress[season] = {
          lifetimeScore: Number.isFinite(progress && progress.lifetimeScore) ? Math.max(0, progress.lifetimeScore) : 0,
          bestScore: Number.isFinite(progress && progress.bestScore) ? Math.max(0, progress.bestScore) : 0,
          bestLevel: Number.isInteger(progress && progress.bestLevel) ? Math.max(0, Math.min(7, progress.bestLevel)) : 0
        };
      });
      if (!saved.seasonProgress) {
        seasonProgress.spring = {
          lifetimeScore: Number.isFinite(saved.lifetimeScore) ? Math.max(0, saved.lifetimeScore) : 0,
          bestScore: Number.isFinite(saved.bestScore) ? Math.max(0, saved.bestScore) : 0,
          bestLevel: Number.isInteger(saved.bestLevel) ? Math.max(0, Math.min(7, saved.bestLevel)) : 0
        };
      }
      return { seasonProgress, playerName: typeof saved.playerName === "string" ? saved.playerName : "" };
    } catch (error) {
      console.error("无法读取珞珈拾光的本地进度。", error);
      return emptyProfile();
    }
  }

  function emptyProfile() {
    const seasonProgress = {};
    Object.keys(SEASONS).forEach((season) => {
      seasonProgress[season] = { lifetimeScore: 0, bestScore: 0, bestLevel: 0 };
    });
    return { seasonProgress, playerName: "" };
  }

  function currentProgress() {
    if (!profile.seasonProgress[currentSeason]) {
      profile.seasonProgress[currentSeason] = { lifetimeScore: 0, bestScore: 0, bestLevel: 0 };
    }
    return profile.seasonProgress[currentSeason];
  }

  function levelInfo(index) {
    const seasonLevel = SEASONS[currentSeason].levels[index];
    return {
      ...seasonLevel,
      name: seasonLevel[0],
      icon: seasonLevel[1],
      color: seasonLevel[2],
      description: seasonLevel[3],
      radius: PHYSICS[index].radius,
      points: PHYSICS[index].points,
      place: seasonLevel[4] || SEASONS[currentSeason].place
    };
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
    return Object.keys(SEASONS).reduce((count, season) =>
      count + SEASONS[season].thresholds.filter((scoreThreshold) =>
        profile.seasonProgress[season].lifetimeScore >= scoreThreshold).length, 0);
  }

  function renderProfile() {
    const progress = currentProgress();
    const season = SEASONS[currentSeason];
    const totalScore = Object.keys(SEASONS).reduce((total, key) =>
      total + profile.seasonProgress[key].lifetimeScore, 0);
    document.querySelector("#best-score").textContent = progress.bestScore.toLocaleString("zh-CN");
    document.querySelector("#lifetime-score").textContent = totalScore.toLocaleString("zh-CN");
    document.querySelector("#fragment-badge").textContent = unlockedFragments();
    const seasonFragments = season.thresholds.filter((threshold) => progress.lifetimeScore >= threshold).length;
    document.querySelector("#journal-progress").style.width = `${seasonFragments * 25}%`;
    document.querySelector("#discovered-count").textContent = `已发现 ${progress.bestLevel + 1} / ${season.levels.length}`;
    document.querySelector("#highest-merge").textContent = levelInfo(highestLevel).name;
    document.querySelector("#season-caption").textContent = season.caption;
    document.querySelector("#season-subtitle").textContent = season.subtitle;
    document.querySelector("#score-season-label").textContent = `${season.name}日漫游`;
    document.querySelector("#playfield-season-caption").textContent = `珞珈拾光 · ${season.adjective}漫游计划`;
    document.querySelector("#screen-footer-season").textContent = `把珞珈山的${season.adjective}，合成一场相遇。`;
    document.querySelector("#screen-footer-caption").textContent = `${season.caption} GAME`;
    document.querySelector("#overlay-kicker").textContent = `${season.name.toUpperCase()} AT WUHAN UNIVERSITY`;
    document.querySelector("#overlay-title").textContent = season.title;
    document.querySelector("#game-status").textContent = `${season.adjective}漫游`;
    gameScreen.dataset.season = currentSeason;
    gameScreen.dataset.seasonMotto = season.motto;
    document.querySelector('meta[name="theme-color"]').content = getComputedStyle(gameScreen).getPropertyValue("--season-background").trim();
    document.querySelectorAll("[data-season]").forEach((button) => {
      const selected = button.dataset.season === currentSeason;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    renderRing();
  }

  function renderRing() {
    const ring = document.querySelector("#evolution-ring");
    const radius = 42;
    ring.innerHTML = SEASONS[currentSeason].levels.map((_, index) => {
      const level = levelInfo(index);
      const angle = ((index * 360) / 8 - 90) * Math.PI / 180;
      const left = 50 + Math.cos(angle) * radius;
      const top = 50 + Math.sin(angle) * radius;
      const locked = index > currentProgress().bestLevel;
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
    } else if (type === "skills") {
      renderSkills();
    } else if (type === "season-confirm") {
      modalKicker.textContent = "CHANGE SEASON";
      modalTitle.textContent = "切换季节？";
      modalContent.innerHTML = `<p class="season-confirm-copy">切换会结束当前这一局，不计入成绩；当前季节的累计进度会保留。</p><div class="season-confirm-actions"><button type="button" id="cancel-season">继续本局</button><button type="button" id="confirm-season">切换到${SEASONS[pendingSeason].name}季</button></div>`;
    } else if (type === "help") {
      modalKicker.textContent = "HOW TO PLAY";
      modalTitle.textContent = "珞珈漫游指南";
      modalContent.innerHTML = `<ol class="help-list">
        <li>移动鼠标或手指，选择记忆落下的位置；点击投放。</li>
        <li>两个相同的校园元素相遇，会合成更高一级的记忆。</li>
        <li>融合获得分数与共鸣能量；选择技能后，能量充足时可以释放。</li>
        <li>每局两分钟，暂停或容器堆满时结算；本季累计积分解锁四片实景手札。</li>
        <li>排行榜通过 Node 服务共享保存；打开 file:// 或服务器未运行时，成绩无法上传。</li>
      </ol>`;
    }
    document.querySelector("#modal-close").focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    if (pausedForSeasonPrompt && active) {
      pausedForSeasonPrompt = false;
      paused = false;
      previousFrame = 0;
      updateEnergy();
      animationFrame = requestAnimationFrame(tick);
    }
  }

  function renderJournal() {
    const season = SEASONS[currentSeason];
    const progress = currentProgress();
    const unlocked = season.thresholds.filter((threshold) => progress.lifetimeScore >= threshold).length;
    const nextThreshold = season.thresholds.find((threshold) => progress.lifetimeScore < threshold);
    const pieces = season.thresholds.map((threshold, index) => {
      const isUnlocked = progress.lifetimeScore >= threshold;
      return `<div class="puzzle-piece ${isUnlocked ? "is-open" : ""}"><span>${isUnlocked ? "✦" : `0${index + 1}`}</span><span>${isUnlocked ? "已收集" : `${threshold} 分`}</span></div>`;
    }).join("");
    modalKicker.textContent = "THE LUOJIA JOURNAL";
    modalTitle.textContent = `${season.name}季拾光手札`;
    modalContent.innerHTML = `<div class="book-layout" data-season="${currentSeason}">
      <div class="book-picture">
        <img class="book-photo" id="journal-photo" alt="${season.name}季武汉大学校园实景">
        <div class="photo-placeholder" id="photo-placeholder"><span>等待添加${season.name}季武大实景照片<br><small>${season.photo}</small></span></div>
        <span class="photo-credit" id="photo-credit">实景照片待添加</span>
        <div class="fragment-puzzle">${pieces}</div>
      </div>
      <article class="book-copy">
        <div class="book-page-number"><span>${season.caption}</span><span>MEMORY FRAGMENTS</span></div>
        <h3>${season.place}</h3><p>${season.description}</p><div class="book-quote">${season.quote}</div>
        <div class="book-status">已拼合 ${unlocked} / 4 片${nextThreshold ? ` · 本季再得 ${nextThreshold - progress.lifetimeScore} 分，解锁下一片` : " · 本季照片已完整拼合"}</div>
      </article>
    </div>`;
    const photo = document.querySelector("#journal-photo");
    const placeholder = document.querySelector("#photo-placeholder");
    loadSeasonPhoto(photo, placeholder, document.querySelector("#photo-credit"), currentSeason);
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  async function renderRank() {
    modalKicker.textContent = "THE LUOJIA WALKERS";
    modalTitle.textContent = `${SEASONS[currentSeason].name}季珞珈拾光榜`;
    modalContent.innerHTML = `<p class="rank-disclaimer" id="rank-status">正在读取服务器榜单…</p>`;
    try {
      const response = await fetch(`/api/leaderboard?season=${encodeURIComponent(currentSeason)}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`排行榜服务响应 ${response.status}`);
      const result = await response.json();
      leaderboardEntries = Array.isArray(result.entries) ? result.entries : [];
      leaderboardError = "";
    } catch (error) {
      leaderboardEntries = [];
      leaderboardError = "排行榜服务暂不可用。请通过 Node 服务启动游戏后重试。";
      console.error("读取服务器排行榜失败。", error);
    }
    const rows = leaderboardEntries.map((entry, index) => `<tr>
      <td>${String(index + 1).padStart(2, "0")}</td><td>${escapeHtml(entry.name)}</td>
      <td>${Number(entry.score).toLocaleString("zh-CN")}</td><td>${Number(entry.fragments || 0)} 片</td>
    </tr>`).join("");
    const table = leaderboardEntries.length
      ? `<table class="rank-table"><thead><tr><th>名次</th><th>漫游者</th><th>最高记录</th><th>本季碎片</th></tr></thead><tbody>${rows}</tbody></table>`
      : `<p class="rank-empty">${leaderboardError || "本季还没有上榜成绩，来成为第一个漫游者吧。"}</p>`;
    modalContent.innerHTML = `${table}<p class="rank-disclaimer">服务器共享榜单 · 成绩由服务端保存。昵称暂未绑定身份，正式比赛部署建议接入校园统一认证。</p><button type="button" class="rank-refresh" id="rank-refresh">刷新榜单</button>`;
  }

  function renderEncyclopedia() {
    modalKicker.textContent = "MEMORY EVOLUTION";
    modalTitle.textContent = `${SEASONS[currentSeason].name}季融合图鉴`;
    modalContent.innerHTML = `<p class="encyclopedia-season-note">本季收集本季记忆 · 选择季节后，元素与图鉴也会随之变化</p><div class="encyclopedia-grid">${SEASONS[currentSeason].levels.map((_, index) => {
      const level = levelInfo(index);
      const locked = index > currentProgress().bestLevel;
      return `<button type="button" class="encyclopedia-entry ${locked ? "is-locked" : ""}" data-level="${index}">
        <span class="encyclopedia-art" style="--art-color:${level.color}"><img alt=""><i>${locked ? "?" : level.icon}</i><b>0${index + 1}</b><em>✦</em></span>
        <strong>${locked ? "待发现" : level.name}</strong><small>${locked ? "继续合成解锁" : level.place}</small>
      </button>`;
    }).join("")}</div>`;
    modalContent.querySelectorAll(".encyclopedia-art img").forEach((image) =>
      loadSeasonPhoto(image, null, null, currentSeason));
  }

  function renderEntry(index) {
    const level = levelInfo(index);
    const locked = index > currentProgress().bestLevel;
    modalKicker.textContent = `MEMORY 0${index + 1} · FIELD NOTES`;
    modalTitle.textContent = locked ? "尚未发现的校园记忆" : level.name;
    modalContent.innerHTML = `<div class="entry-detail"><span class="entry-detail-icon" style="background:${level.color}"><img alt=""><i>${locked ? "?" : level.icon}</i></span><div>
      <h3>${locked ? "再完成一次融合，发现新的校园记忆。" : level.place}</h3>
      <p>${locked ? "融合相同等级的校园元素，逐步解锁完整图鉴。" : level.description}</p>
      <button type="button" id="encyclopedia-back">← 返回融合图鉴</button>
    </div></div>`;
    loadSeasonPhoto(modalContent.querySelector(".entry-detail-icon img"), null, null, currentSeason);
  }

  function loadSeasonPhoto(image, placeholder, credit, seasonId) {
    if (!photoAvailability[seasonId]) {
      photoAvailability[seasonId] = fetch(`/api/photos/${seasonId}`, { cache: "no-store" })
        .then((response) => {
          if (!response.ok) throw new Error(`Photo status request failed with HTTP ${response.status}`);
          return response.json();
        })
        .then((result) => result.available)
        .catch((error) => {
          console.warn(`无法检查${SEASONS[seasonId].name}季照片素材。`, error);
          return false;
        });
    }
    photoAvailability[seasonId].then((available) => {
      if (!image.isConnected) return;
      if (!available) {
        if (placeholder) placeholder.hidden = false;
        return;
      }
      image.addEventListener("load", () => {
        if (placeholder) placeholder.hidden = true;
        if (credit) credit.textContent = `武汉大学校园实景 · ${SEASONS[seasonId].name}季`;
      }, { once: true });
      image.addEventListener("error", () => {
        image.hidden = true;
        if (placeholder) placeholder.hidden = false;
      }, { once: true });
      image.src = SEASONS[seasonId].photo;
    });
  }

  function renderSkills() {
    modalKicker.textContent = "LUOJIA RESONANCE";
    modalTitle.textContent = "选择本局技能";
    modalContent.innerHTML = `<div class="skill-choices">${SKILLS.map((skill) => `
      <button type="button" class="skill-choice ${selectedSkill === skill.id ? "is-selected" : ""}" data-skill="${skill.id}">
        <span class="skill-choice-icon">${skill.icon}</span><span><strong>${skill.name}</strong><small>${skill.detail}</small></span>
        <em>消耗 ${skill.cost} 格</em>${selectedSkill === skill.id ? '<b>当前使用</b>' : ""}
      </button>`).join("")}</div>`;
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
    document.querySelector("#skill-button").disabled = !active || paused || energy < SKILLS.find((skill) => skill.id === selectedSkill).cost;
  }

  function renderSelectedSkill() {
    const skill = SKILLS.find((item) => item.id === selectedSkill);
    document.querySelector("#selected-skill-name").textContent = skill.name;
    document.querySelector("#selected-skill-description").textContent = skill.description;
    document.querySelector(".skill-art").textContent = skill.icon;
    document.querySelector("#skill-button").setAttribute("aria-label", `${skill.name}，${skill.description}，消耗${skill.cost}格能量`);
    updateEnergy();
  }

  function startGame() {
    balls = [];
    score = 0;
    merges = 0;
    highestLevel = 0;
    energy = 0;
    remaining = 120;
    runId = null;
    nextLevel = Math.random() < .76 ? 0 : 1;
    currentX = W / 2;
    cooldown = 0;
    active = true;
    paused = false;
    previousFrame = 0;
    overlay.classList.add("is-hidden");
    document.querySelector("#game-status").textContent = "准备好开始漫游";
    document.querySelector("#result-submit").hidden = true;
    document.querySelector("#submit-status").textContent = "";
    document.querySelector("#player-name").value = profile.playerName;
    document.querySelector("#pause-button").textContent = "Ⅱ";
    document.querySelector("#pause-button").setAttribute("aria-label", "暂停游戏");
    document.querySelector("#score").textContent = "0";
    document.querySelector("#merge-count").textContent = "0";
    document.querySelector("#highest-merge").textContent = levelInfo(0).name;
    updateNextPiece();
    updateEnergy();
    updateTimer();
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(tick);
    const epoch = ++runEpoch;
    fetch("/api/runs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ season: currentSeason })
    }).then(async (response) => {
      if (!response.ok) throw new Error(`排行榜服務响应 ${response.status}`);
      const result = await response.json();
      if (epoch !== runEpoch) return;
      runId = result.runId;
      if (!active && score > 0) {
        document.querySelector("#submit-score").disabled = false;
        document.querySelector("#submit-status").textContent = "已连接共享榜单，可以提交本局成绩。";
      }
    }).catch((error) => {
      console.warn("无法连接共享排行榜服务。", error);
      if (epoch === runEpoch && !active && score > 0) document.querySelector("#submit-status").textContent = "排行榜服务离线，本局成绩无法提交。";
    });
  }

  function endGame(reason) {
    if (!active) return;
    active = false;
    paused = false;
    const progress = currentProgress();
    progress.bestScore = Math.max(progress.bestScore, score);
    progress.bestLevel = Math.max(progress.bestLevel, highestLevel);
    saveProfile();
    renderProfile();
    document.querySelector("#game-status").textContent = "本局拾光已收进手札";
    document.querySelector("#pause-button").textContent = "↻";
    document.querySelector("#pause-button").setAttribute("aria-label", "重新开始游戏");
    document.querySelector("#overlay-title").textContent = `这一局，拾光 ${score.toLocaleString("zh-CN")} 分`;
    document.querySelector("#overlay-copy").innerHTML = `${reason}<br>本季手札已解锁 ${SEASONS[currentSeason].thresholds.filter((threshold) => progress.lifetimeScore >= threshold).length} / 4 片。`;
    document.querySelector("#result-submit").hidden = score <= 0;
    document.querySelector("#player-name").value = profile.playerName;
    document.querySelector("#submit-status").textContent = score > 0
      ? (runId ? "成绩将在服务端校验并计入本季共享榜单。" : "正在连接排行榜服务；若无法提交，请使用 Node 服务打开网页。")
      : "完成一场漫游后，可以提交成绩。";
    document.querySelector("#submit-score").disabled = !runId;
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
      document.querySelector("#game-status").textContent = `${SEASONS[currentSeason].adjective}漫游已暂停`;
      document.querySelector("#pause-button").textContent = "▶";
      document.querySelector("#pause-button").setAttribute("aria-label", "继续游戏");
      document.querySelector("#overlay-title").textContent = "歇一歇，再继续拾光。";
      document.querySelector("#overlay-copy").innerHTML = `已收集 ${score} 分珞珈记忆。<br>这一页会为你留在这里。`;
      startButton.innerHTML = '继续这一局 <span>→</span>';
      overlay.classList.remove("is-hidden");
      cancelAnimationFrame(animationFrame);
    } else {
      document.querySelector("#game-status").textContent = `${SEASONS[currentSeason].adjective}漫游中`;
      document.querySelector("#pause-button").textContent = "Ⅱ";
      document.querySelector("#pause-button").setAttribute("aria-label", "暂停游戏");
      overlay.classList.add("is-hidden");
      previousFrame = 0;
      animationFrame = requestAnimationFrame(tick);
    }
    updateEnergy();
  }

  function updateNextPiece() {
    const level = levelInfo(nextLevel);
    document.querySelector("#next-icon").textContent = level.icon;
    document.querySelector("#next-name").textContent = level.name;
    document.querySelector("#next-icon-large").textContent = level.icon;
    document.querySelector("#next-name-large").textContent = level.name;
  }

  function drop() {
    if (!active || paused || cooldown > 0) return;
    const radius = levelInfo(nextLevel).radius;
    const x = Math.max(LEFT + radius, Math.min(RIGHT - radius, currentX));
    balls.push({ level: nextLevel, x, y: 62 + radius, vx: (Math.random() - .5) * 8, vy: 5, radius, age: 0, overflow: 0, alive: true });
    nextLevel = Math.random() < .76 ? 0 : 1;
    updateNextPiece();
    cooldown = .29;
    playTone(460, .055);
  }

  function merge(a, b) {
    if (!a.alive || !b.alive || a.level !== b.level || a.level >= 7) return false;
    a.alive = false;
    b.alive = false;
    const level = a.level + 1;
    const levelData = levelInfo(level);
    const radius = levelData.radius;
    const x = (a.x + b.x) / 2;
    const y = (a.y + b.y) / 2;
    balls.push({ level, x: Math.max(LEFT + radius, Math.min(RIGHT - radius, x)), y, vx: (Math.random() - .5) * 30, vy: -Math.min(85, radius * 1.55), radius, age: 0, overflow: 0, alive: true });
    merges += 1;
    highestLevel = Math.max(highestLevel, level);
    score += levelData.points;
    currentProgress().lifetimeScore += levelData.points;
    energy = Math.min(5, energy + 1);
    document.querySelector("#score").textContent = score.toLocaleString("zh-CN");
    document.querySelector("#merge-count").textContent = merges;
    document.querySelector("#highest-merge").textContent = levelInfo(highestLevel).name;
    currentProgress().bestLevel = Math.max(currentProgress().bestLevel, highestLevel);
    renderProfile();
    updateEnergy();
    playTone(540 + level * 45, .11);
    if (level === 7) showToast(`${SEASONS[currentSeason].name}季终极图鉴已合成！`);
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
        if (a.level === b.level && a.level < 7) { merge(a, b); continue; }
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
    const def = levelInfo(ball.level);
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
      const radius = levelInfo(nextLevel).radius;
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

  function useSkill() {
    const skill = SKILLS.find((item) => item.id === selectedSkill);
    if (!active || paused || energy < skill.cost) return;
    energy -= skill.cost;
    if (skill.id === "clear") {
      const lowest = [...balls].sort((a, b) => a.level - b.level).slice(0, 2);
      lowest.forEach((ball) => { ball.alive = false; });
      balls = balls.filter((ball) => ball.alive);
      showToast(lowest.length ? `${skill.name}：整理了两枚最初的记忆。` : "场上还没有需要整理的记忆。");
    } else if (skill.id === "lift") {
      balls.forEach((ball) => { ball.vy = Math.min(ball.vy, -245); ball.overflow = 0; });
      showToast(`${skill.name}：一阵清风托起了所有记忆。`);
    } else if (skill.id === "time") {
      remaining = Math.min(150, remaining + 15);
      updateTimer();
      showToast(`${skill.name}：漫游时间增加 15 秒。`);
    }
    updateEnergy();
    draw();
    playTone(720, .18);
  }

  function changeSeason(seasonId) {
    if (!SEASONS[seasonId] || seasonId === currentSeason) return;
    if (active) {
      pendingSeason = seasonId;
      pausedForSeasonPrompt = true;
      paused = true;
      cancelAnimationFrame(animationFrame);
      updateEnergy();
      openModal("season-confirm");
      return;
    }
    applySeason(seasonId);
  }

  function applySeason(seasonId) {
    active = false;
    paused = false;
    pausedForSeasonPrompt = false;
    pendingSeason = null;
    cancelAnimationFrame(animationFrame);
    runEpoch += 1;
    runId = null;
    currentSeason = seasonId;
    try {
      localStorage.setItem(SEASON_KEY, seasonId);
    } catch (error) {
      console.error("无法保存季节选择。", error);
    }

    function cancelSeasonChange() {
      closeModal();
    }
    balls = [];
    score = 0;
    merges = 0;
    highestLevel = 0;
    energy = 0;
    remaining = 120;
    nextLevel = Math.random() < .76 ? 0 : 1;
    document.querySelector("#score").textContent = "0";
    document.querySelector("#merge-count").textContent = "0";
    document.querySelector("#timer").textContent = "02:00";
    document.querySelector("#overlay-title").textContent = SEASONS[currentSeason].title;
    document.querySelector("#overlay-copy").innerHTML = "点击或触摸场地，投下这一份记忆。<br>让相同的校园元素相遇，合成更美的风景。";
    document.querySelector("#result-submit").hidden = true;
    document.querySelector("#submit-status").textContent = "";
    startButton.innerHTML = '开始漫游 <span>→</span>';
    overlay.classList.remove("is-hidden");
    renderProfile();
    renderSelectedSkill();
    updateNextPiece();
    draw();
    if (modal.classList.contains("is-open")) renderJournal();
    const notice = document.querySelector("#season-announcement");
    notice.textContent = `已切换至${SEASONS[currentSeason].name}季 · 图鉴与手札已更新`;
    notice.classList.add("is-visible");
    clearTimeout(seasonNoticeTimeout);
    seasonNoticeTimeout = setTimeout(() => notice.classList.remove("is-visible"), 2200);
  }

  async function submitScore() {
    const button = document.querySelector("#submit-score");
    const status = document.querySelector("#submit-status");
    const nameInput = document.querySelector("#player-name");
    const name = nameInput.value.trim();
    if (!runId) {
      status.textContent = "没有连接到排行榜服务，请通过 Node 服务启动网页。";
      return;
    }
    if (!name || name.length > 16) {
      status.textContent = "请输入 1–16 个字符的昵称。";
      nameInput.focus();
      return;
    }
    button.disabled = true;
    status.textContent = "正在提交成绩…";
    try {
      const response = await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runId, name, score, season: currentSeason })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `服务器响应 ${response.status}`);
      profile.playerName = name;
      saveProfile();
      status.textContent = "成绩已由服务器记录，已更新本季共享排行榜。";
      runId = null;
      playTone(780, .2);
      if (modal.classList.contains("is-open")) renderRank();
    } catch (error) {
      console.error("成绩提交失败。", error);
      status.textContent = error.message || "提交失败，请检查排行榜服务器后重试。";
      button.disabled = false;
    }
  }

  async function refreshLeaderboard() {
    if (!modal.classList.contains("is-open")) return;
    await renderRank();
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
  document.querySelector("#skill-button").addEventListener("click", useSkill);
  document.querySelector("#skill-select-button").addEventListener("click", () => openModal("skills"));
  document.querySelector("#submit-score").addEventListener("click", submitScore);
  document.querySelectorAll(".season-switcher [data-season]").forEach((button) => {
    button.addEventListener("click", () => changeSeason(button.dataset.season));
  });
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
    const skillButton = event.target.closest("[data-skill]");
    if (skillButton) {
      selectedSkill = skillButton.dataset.skill;
      renderSelectedSkill();
      closeModal();
      showToast(`${SKILLS.find((skill) => skill.id === selectedSkill).name}已设为本局技能。`);
    }
    if (event.target.id === "rank-refresh") renderRank();
    if (event.target.id === "cancel-season") cancelSeasonChange();
    if (event.target.id === "confirm-season" && pendingSeason) {
      const seasonId = pendingSeason;
      closeModal();
      applySeason(seasonId);
    }
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
    if (event.key.toLowerCase() === "q" && active && !paused && !modal.classList.contains("is-open")) useSkill();
    if (event.code === "ArrowLeft" && active && !paused) currentX = Math.max(LEFT + 20, currentX - 18);
    if (event.code === "ArrowRight" && active && !paused) currentX = Math.min(RIGHT - 20, currentX + 18);
  });
  window.addEventListener("resize", draw);

  renderProfile();
  renderSelectedSkill();
  updateNextPiece();
  updateTimer();
  draw();
})();

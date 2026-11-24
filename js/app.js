/* Market Mastery Academy — app engine (vanilla JS, no build step) */
(function () {
  "use strict";
  var DATA = window.APP_DATA;
  var KEY = "mma_state_v1";

  /* ---------------- state ---------------- */
  function defaultState() {
    return { xp: 0, streak: 0, bestStreak: 0, lastActive: null, badges: [], progress: {}, flash: {} };
  }
  var S;
  try { S = JSON.parse(localStorage.getItem(KEY)) || defaultState(); } catch (e) { S = defaultState(); }
  if (!S.progress) S.progress = {};
  if (!S.badges) S.badges = [];
  if (!S.flash) S.flash = {};
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  function dayStr(d) { return d.toISOString().slice(0, 10); }
  (function updateStreak() {
    var t = dayStr(new Date());
    if (S.lastActive !== t) {
      var y = new Date(Date.now() - 864e5);
      S.streak = (S.lastActive === dayStr(y)) ? S.streak + 1 : 1;
      S.bestStreak = Math.max(S.bestStreak, S.streak);
      S.lastActive = t;
      save();
    }
  })();

  /* ---------------- ranks & badges ---------------- */
  var RANKS = [
    { xp: 0, name: "Novice", ico: "🌱" },
    { xp: 150, name: "Apprentice", ico: "📖" },
    { xp: 400, name: "Day Trader", ico: "📊" },
    { xp: 800, name: "Position Trader", ico: "📈" },
    { xp: 1400, name: "Floor Trader", ico: "🏛️" },
    { xp: 2200, name: "Market Maker", ico: "⚖️" },
    { xp: 3400, name: "Pit Master", ico: "🎯" },
    { xp: 6000, name: "Market Master", ico: "👑" }
  ];
  function rankOf(xp) {
    var r = RANKS[0];
    for (var i = 0; i < RANKS.length; i++) if (xp >= RANKS[i].xp) r = RANKS[i];
    return r;
  }
  function nextRank(xp) {
    for (var i = 0; i < RANKS.length; i++) if (xp < RANKS[i].xp) return RANKS[i];
    return null;
  }

  function bookById(id) { return DATA.books.filter(function (b) { return b.id === id; })[0]; }
  function chById(id) {
    for (var i = 0; i < DATA.books.length; i++)
      for (var j = 0; j < DATA.books[i].chapters.length; j++)
        if (DATA.books[i].chapters[j].id === id) return { book: DATA.books[i], ch: DATA.books[i].chapters[j], idx: j };
    return null;
  }
  function prog(bookId, chId) { return (S.progress[bookId] || {})[chId] || null; }
  function setProg(bookId, chId, p) {
    if (!S.progress[bookId]) S.progress[bookId] = {};
    S.progress[bookId][chId] = p;
  }
  function isUnlocked(book, idx) {
    if (idx === 0) return true;
    var prev = book.chapters[idx - 1];
    var p = prog(book.id, prev.id);
    return !!(p && p.done);
  }
  function doneCount() {
    var n = 0;
    DATA.books.forEach(function (b) { b.chapters.forEach(function (c) { var p = prog(b.id, c.id); if (p && p.done) n++; }); });
    return n;
  }
  function totalChapters() { return DATA.books.reduce(function (a, b) { return a + b.chapters.length; }, 0); }
  function bookDone(b) { return b.chapters.every(function (c) { var p = prog(b.id, c.id); return p && p.done; }); }

  function badgeDefs() {
    return [
      { id: "rookie", ico: "🌱", name: "Rookie", desc: "Earn your first 100 XP", test: function (s) { return s.xp >= 100; } },
      { id: "first-steps", ico: "🚀", name: "First Steps", desc: "Complete your first chapter", test: function (s) { return doneCount() >= 1; } },
      { id: "flawless", ico: "💯", name: "Flawless", desc: "Score 100% on a chapter quiz", test: function (s, c) { return !!(c && c.perfect); } },
      { id: "streak3", ico: "🔥", name: "On Fire (3)", desc: "Maintain a 3-day streak", test: function (s) { return s.bestStreak >= 3; } },
      { id: "streak7", ico: "🌟", name: "Unstoppable (7)", desc: "Maintain a 7-day streak", test: function (s) { return s.bestStreak >= 7; } },
      { id: "xp1000", ico: "⚡", name: "1,000 XP", desc: "Reach 1,000 total XP", test: function (s) { return s.xp >= 1000; } },
      { id: "xp3000", ico: "🚀", name: "3,000 XP", desc: "Reach 3,000 total XP", test: function (s) { return s.xp >= 3000; } },
      { id: "book-steidlmayer", ico: "📘", name: "Steidlmayer Scholar", desc: "Complete Steidlmayer on Markets", test: function (s) { return bookDone(bookById("steidlmayer")); } },
      { id: "book-mip", ico: "📗", name: "Auction Architect", desc: "Complete Markets in Profile", test: function (s) { return bookDone(bookById("mip")); } },
      { id: "book-mom", ico: "📙", name: "Mind Master", desc: "Complete Mind Over Markets", test: function (s) { return bookDone(bookById("mom")); } },
      { id: "book-momentum", ico: "📕", name: "Momentum Maven", desc: "Complete Markets and Momentum", test: function (s) { return bookDone(bookById("momentum")); } },
      { id: "master", ico: "👑", name: "Market Master", desc: "Complete every chapter in the Academy", test: function (s) { return doneCount() === totalChapters(); } }
    ];
  }
  function checkBadges(ctx) {
    var earned = [];
    badgeDefs().forEach(function (b) {
      if (S.badges.indexOf(b.id) === -1 && b.test(S, ctx)) {
        S.badges.push(b.id);
        earned.push(b);
      }
    });
    if (earned.length) { save(); earned.forEach(function (b) { toast(b.ico, "Badge unlocked: " + b.name, b.desc); }); }
    return earned;
  }

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function el(id) { return document.getElementById(id); }
  function pct(x, n) { return n ? Math.round((x / n) * 100) : 0; }
  function ringSVG(pctVal, color, size) {
    size = size || 44;
    var r = (size - 8) / 2, c = 2 * Math.PI * r;
    return '<svg class="ring" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="5"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="5" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - pctVal / 100)).toFixed(1) + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/>' +
      '</svg>';
  }

  /* ---------------- confetti & toast ---------------- */
  var cvs = el("confetti"), ctx2d = cvs.getContext ? cvs.getContext("2d") : null, parts = [], confettiOn = false;
  function sizeConfetti() { cvs.width = innerWidth; cvs.height = innerHeight; }
  addEventListener("resize", sizeConfetti); sizeConfetti();
  function confettiBurst(n) {
    var colors = ["#f5b942", "#2dd4bf", "#34d399", "#60a5fa", "#a78bfa", "#fb923c", "#f87171"];
    for (var i = 0; i < (n || 160); i++) {
      parts.push({ x: innerWidth / 2 + (Math.random() - 0.5) * 260, y: innerHeight * 0.35, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 12 - 4, g: 0.32 + Math.random() * 0.12, s: 5 + Math.random() * 7, c: colors[(Math.random() * colors.length) | 0], r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3, life: 90 + Math.random() * 60 });
    }
    if (!confettiOn) { confettiOn = true; requestAnimationFrame(confettiTick); }
  }
  function confettiTick() {
    if (!ctx2d) { confettiOn = false; return; }
    ctx2d.clearRect(0, 0, cvs.width, cvs.height);
    parts = parts.filter(function (p) { return p.life > 0 && p.y < cvs.height + 30; });
    parts.forEach(function (p) {
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.r += p.vr; p.life--;
      ctx2d.save(); ctx2d.translate(p.x, p.y); ctx2d.rotate(p.r);
      ctx2d.globalAlpha = Math.min(1, p.life / 40);
      ctx2d.fillStyle = p.c; ctx2d.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      ctx2d.restore();
    });
    if (parts.length) requestAnimationFrame(confettiTick); else { confettiOn = false; ctx2d.clearRect(0, 0, cvs.width, cvs.height); }
  }
  function toast(ico, title, sub) {
    var root = el("toast-root");
    var t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = '<div class="t-ico">' + esc(ico) + '</div><div><div class="t-title">' + esc(title) + '</div><div class="t-sub">' + esc(sub || "") + '</div></div>';
    root.appendChild(t);
    setTimeout(function () { t.style.transition = "opacity .4s, transform .4s"; t.style.opacity = "0"; t.style.transform = "translateX(30px)"; setTimeout(function () { t.remove(); }, 420); }, 4200);
  }

  /* ---------------- market profile SVG ---------------- */
  var SHAPES = {
    normal: ["   D", "  CDE", " BCDE", "ABCDEF", "ABCDEF", " BCDE", "  CDE", "   D"],
    pShape: ["    G", "   FG", "  EFG", " DEFG", "CDEFG", "BCDEF", "ABCDEF"],
    bShape: ["ABCDEF", "BCDEF", " CDEF", "CDEFG", " DEFG", "  EFG", "   FG"],
    trendUp: ["      H", "     GH", "    FGH", "   EFGH", "  DEFGH", " CDEFGH", "ABCDEFGH"],
    trendDown: ["ABCDEFGH", " BCDEFGH", "  CDEFGH", "   DEFGH", "    EFGH", "     FGH", "      GH"],
    doubleDist: ["   FG", "  EFG", " ABCDE", "  CDE", "   F", "  EFG", " DEFG", "ABCDEFG"]
  };
  function profileSVG(shapeKey, w) {
    var rows = SHAPES[shapeKey] || SHAPES.normal;
    w = w || 340;
    var cell = 26, padL = 46, padT = 18, padB = 26;
    var cols = 0; rows.forEach(function (r) { cols = Math.max(cols, r.length); });
    var h = padT + rows.length * cell + padB;
    var letters = "ABCDEFGH";
    var s = '<svg class="q-chart" width="' + w + '" height="' + (h * w / 340).toFixed(0) + '" viewBox="0 0 340 ' + h + '" style="max-width:' + w + 'px">';
    s += '<rect x="0" y="0" width="340" height="' + h + '" rx="12" fill="#0d1526" stroke="#232f4d"/>';
    var maxP = 105.50, minP = 99.50, step = (maxP - minP) / (rows.length - 1);
    rows.forEach(function (row, ri) {
      var y = padT + ri * cell;
      var price = (maxP - ri * step).toFixed(2);
      s += '<text x="8" y="' + (y + cell / 2 + 4) + '" fill="#5b6784" font-size="10" font-family="monospace">' + price + '</text>';
      for (var ci = 0; ci < row.length; ci++) {
        var ch = row[ci];
        if (ch === " ") continue;
        var x = padL + ci * cell;
        var hot = ri === 0 || ri === rows.length - 1;
        s += '<rect x="' + (x + 2) + '" y="' + (y + 3) + '" width="' + (cell - 4) + '" height="' + (cell - 6) + '" rx="4" fill="' + (hot ? "rgba(248,113,113,.18)" : "rgba(245,185,66,.16)") + '" stroke="' + (hot ? "#f87171" : "#f5b942") + '" stroke-width="1"/>';
        s += '<text x="' + (x + cell / 2) + '" y="' + (y + cell / 2 + 4.5) + '" fill="' + (hot ? "#fca5a5" : "#ffd97a") + '" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">' + ch + '</text>';
      }
    });
    for (var t = 0; t < cols; t++) {
      s += '<text x="' + (padL + t * cell + cell / 2) + '" y="' + (h - 8) + '" fill="#5b6784" font-size="10" text-anchor="middle" font-family="monospace">' + (letters[t] || "") + '</text>';
    }
    s += '<text x="8" y="' + (h - 8) + '" fill="#5b6784" font-size="9" font-family="monospace">PRICE</text>';
    s += '<text x="' + (padL + cols * cell - 10) + '" y="' + (h - 8) + '" fill="#5b6784" font-size="9" text-anchor="end" font-family="monospace">TIME →</text>';
    s += '</svg>';
    return s;
  }

  function heroChartSVG() {
    var W = 520, H = 300;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice">';
    s += '<defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f5b942" stop-opacity="0"/><stop offset="1" stop-color="#f5b942" stop-opacity=".25"/></linearGradient></defs>';
    var candles = [[40, 200, 150, 230, 180, 1], [80, 180, 140, 210, 160, 1], [120, 160, 120, 200, 140, 0], [160, 140, 110, 190, 130, 1], [200, 130, 100, 175, 115, 1], [240, 115, 90, 160, 105, 1], [280, 105, 80, 150, 95, 0], [320, 95, 70, 140, 85, 1], [360, 85, 60, 130, 75, 1], [400, 75, 55, 120, 70, 1], [440, 70, 50, 110, 65, 0], [480, 65, 45, 100, 58, 1]];
    candles.forEach(function (c) {
      var x = c[0], top = Math.min(c[1], c[3]), bot = Math.max(c[1], c[3]), col = c[5] ? "#34d399" : "#f87171";
      s += '<line x1="' + x + '" y1="' + c[2] + '" x2="' + x + '" y2="' + c[4] + '" stroke="' + col + '" stroke-width="2"/>';
      s += '<rect x="' + (x - 9) + '" y="' + top + '" width="18" height="' + Math.max(4, bot - top) + '" rx="2" fill="' + col + '" opacity=".85"/>';
    });
    var bell = [[260, 30, "D"], [235, 56, "CDE"], [210, 82, "BCDE"], [185, 108, "ABCDEF"], [160, 134, "ABCDEF"], [135, 160, "BCDE"], [110, 186, "CDE"], [85, 212, "D"]];
    s += '<g opacity=".9">';
    bell.forEach(function (r) {
      var row = r[2];
      for (var i = 0; i < row.length; i++) {
        var x = r[0] - 8 + i * 22;
        s += '<rect x="' + (x - 9) + '" y="' + (r[1] - 9) + '" width="18" height="18" rx="3" fill="rgba(245,185,66,.14)" stroke="#f5b942"/>';
        s += '<text x="' + x + '" y="' + (r[1] + 4.5) + '" fill="#ffd97a" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">' + row[i] + '</text>';
      }
    });
    s += '</g>';
    s += '<path d="M40 230 L480 58" stroke="url(#hg)" stroke-width="3" fill="none"/>';
    s += '</svg>';
    return s;
  }

  /* ---------------- shell ---------------- */
  function navHTML(active) {
    var items = [
      ["#/", "🏠", "Dashboard", "dash"],
      ["#/library", "📚", "Library", "library"],
      ["#/glossary", "🔖", "Glossary", "glossary"],
      ["#/profile", "👤", "Profile", "profile"]
    ];
    var h = '<div class="brand"><div class="brand-mark">MMA</div><div><div class="brand-name">Market Mastery</div><div class="brand-sub">Academy</div></div></div>';
    items.forEach(function (it) {
      h += '<a class="nav-item' + (active === it[3] ? " active" : "") + '" href="' + it[0] + '"><span class="ico">' + it[1] + '</span>' + it[2] + '</a>';
    });
    var r = rankOf(S.xp), nx = nextRank(S.xp);
    var p = nx ? Math.round(((S.xp - r.xp) / (nx.xp - r.xp)) * 100) : 100;
    h += '<div class="nav-xp"><div class="rank">' + r.ico + ' ' + esc(r.name) + '</div><div class="xp">' + S.xp.toLocaleString() + ' XP</div>' +
      '<div class="xp-bar"><i style="width:' + p + '%"></i></div><div class="next">' + (nx ? esc(nx.ico + " " + nx.name) + " at " + nx.xp.toLocaleString() + " XP" : "Top rank achieved") + '</div></div>';
    return h;
  }
  function shell(active, mainHTML) {
    return '<div class="shell"><aside class="sidebar">' + navHTML(active) + '</aside><main class="main">' + mainHTML +
      '<div class="footer-note">Educational content distilled from the four uploaded books for learning purposes only — not financial advice.<br>Progress is stored locally in your browser.</div></main></div>';
  }

  /* ---------------- views ---------------- */
  function continueChapter() {
    for (var i = 0; i < DATA.books.length; i++) {
      var b = DATA.books[i];
      for (var j = 0; j < b.chapters.length; j++) {
        var p = prog(b.id, b.chapters[j].id);
        if (!p || !p.done) return { book: b, ch: b.chapters[j], idx: j };
      }
    }
    return null;
  }

  function viewDashboard() {
    var next = continueChapter();
    var done = doneCount(), total = totalChapters();
    var r = rankOf(S.xp), nx = nextRank(S.xp);
    var p = nx ? Math.round(((S.xp - r.xp) / (nx.xp - r.xp)) * 100) : 100;
    var h = '';
    h += '<div class="hero"><div class="hero-chart">' + heroChartSVG() + '</div>' +
      '<h1>Master the markets, <span class="grad">one chapter at a time.</span></h1>' +
      '<p>Gamified lessons built from four classic trading books — Steidlmayer on Markets, Markets in Profile, Mind Over Markets and Markets and Momentum. Read the concepts, ace the quizzes, earn XP and badges.</p>' +
      '<div class="hero-cta">' +
      (next ? '<a class="btn" href="#/chapter/' + next.ch.id + '">▶ Continue: ' + esc(next.book.short) + ' Ch.' + next.ch.num + ' — ' + esc(next.ch.title) + '</a>' : '<a class="btn" href="#/library">🏆 Review the library</a>') +
      '<a class="btn ghost" href="#/library">📚 Browse all books</a></div></div>';

    h += '<div class="stats">';
    h += statCard("⚡", S.xp.toLocaleString(), "Total XP", '<div class="bar"><i style="width:' + p + '%;background:linear-gradient(90deg,var(--gold),var(--orange))"></i></div>');
    h += statCard(r.ico, esc(r.name), "Trader rank", '<div class="bar"><i style="width:' + p + '%;background:linear-gradient(90deg,var(--teal),var(--blue))"></i></div>');
    h += statCard("🔥", S.streak + " day" + (S.streak === 1 ? "" : "s"), "Daily streak", '<div class="bar"><i style="width:' + Math.min(100, S.bestStreak * 10) + '%;background:linear-gradient(90deg,var(--orange),var(--red))"></i></div>');
    h += statCard("✅", done + " / " + total, "Chapters done", '<div class="bar"><i style="width:' + pct(done, total) + '%;background:linear-gradient(90deg,var(--green),var(--teal))"></i></div>');
    h += statCard("🏅", S.badges.length + " / " + badgeDefs().length, "Badges", '<div class="bar"><i style="width:' + pct(S.badges.length, badgeDefs().length) + '%;background:linear-gradient(90deg,var(--purple),var(--blue))"></i></div>');
    h += '</div>';

    h += '<div class="section-h"><h2>Your books <span class="sub">— progress unlocks the next chapter in each book</span></h2><a href="#/library">View all →</a></div>';
    h += '<div class="book-grid">' + DATA.books.map(bookCardHTML).join("") + '</div>';

    h += '<div class="section-h"><h2>Leaderboard <span class="sub">— practice board with simulated rivals</span></h2></div>';
    h += leaderboardHTML();
    return shell("dash", h);
  }
  function statCard(ico, val, lbl, bar) {
    return '<div class="card stat"><div class="ico">' + ico + '</div><div class="val">' + val + '</div><div class="lbl">' + lbl + '</div>' + (bar || "") + '</div>';
  }
  function bookCardHTML(b) {
    var done = b.chapters.filter(function (c) { var p = prog(b.id, c.id); return p && p.done; }).length;
    var pc = pct(done, b.chapters.length);
    return '<a class="card book-card" href="#/book/' + b.id + '" style="--bc:' + b.color + '">' +
      '<div class="top"><div class="book-cover">' + esc(b.short) + '</div><div><div class="book-title">' + esc(b.title) + '</div><div class="book-author">' + esc(b.author) + '</div></div></div>' +
      '<div class="book-tag">' + esc(b.tagline) + '</div>' +
      '<div class="prog">' + ringSVG(pc, b.color) + '<div><div class="pct">' + pc + '%</div><div class="lbl">' + done + ' / ' + b.chapters.length + ' chapters</div></div></div>' +
      '<div class="book-meta"><span>📖 ' + b.chapters.length + ' chapters</span><span>❓ ' + b.chapters.reduce(function (a, c) { return a + c.quiz.length; }, 0) + ' questions</span><span>🃏 ' + b.chapters.reduce(function (a, c) { return a + c.cards.length; }, 0) + ' cards</span></div>' +
      '</a>';
  }
  function leaderboardHTML() {
    var rivals = [["Ava K.", 5200], ["Marcus T.", 4100], ["Priya S.", 3350], ["Dan R.", 2600], ["Yuki M.", 1900], ["Sofia L.", 1250], ["Tom W.", 700], ["Elena V.", 420]];
    var all = rivals.map(function (r) { return { n: r[0], x: r[1], you: false }; });
    all.push({ n: "You", x: S.xp, you: true });
    all.sort(function (a, b) { return b.x - a.x; });
    var h = "";
    all.slice(0, 8).forEach(function (r, i) {
      h += '<div class="leader' + (r.you ? " you" : "") + '"><span class="pos">#' + (i + 1) + '</span><span class="nm">' + esc(r.n) + '</span><span class="xp">' + r.x.toLocaleString() + ' XP</span></div>';
    });
    return h;
  }

  function viewLibrary() {
    var h = '<h1 class="page-title">Library</h1><p class="page-sub">Four books, ' + totalChapters() + ' gamified chapters. Finish a chapter quiz to unlock the next one. Each chapter has a lesson, a quiz and flashcards.</p>';
    h += '<div style="height:22px"></div><div class="book-grid">' + DATA.books.map(bookCardHTML).join("") + '</div>';
    return shell("library", h);
  }

  function viewBook(bookId) {
    var b = bookById(bookId);
    if (!b) return viewLibrary();
    var done = b.chapters.filter(function (c) { var p = prog(b.id, c.id); return p && p.done; }).length;
    var h = '<div class="crumbs"><a href="#/library">Library</a> / ' + esc(b.title) + '</div>';
    h += '<div class="chapter-head"><div class="badge-num" style="--bc:' + b.color + ';background:linear-gradient(135deg,' + b.color + ',#fb923c)">' + esc(b.short) + '</div>' +
      '<div><h1>' + esc(b.title) + '</h1><div class="meta">by <b>' + esc(b.author) + '</b> · ' + b.chapters.length + ' chapters · ' + done + ' completed</div>' +
      '<p class="page-sub" style="margin-top:8px">' + esc(b.blurb) + '</p></div>' +
      '<div class="prog" style="margin-left:auto">' + ringSVG(pct(done, b.chapters.length), b.color, 56) + '</div></div>';
    h += '<div class="chapter-list">';
    b.chapters.forEach(function (c, i) {
      var unlocked = isUnlocked(b, i);
      var p = prog(b.id, c.id);
      h += '<a class="chapter-row' + (unlocked ? "" : " locked") + (p && p.done ? " done" : "") + '" href="' + (unlocked ? "#/chapter/" + c.id : "#/book/" + b.id) + '">' +
        '<div class="ch-num">' + (p && p.done ? "✓" : unlocked ? c.num : '<span class="lock-ico">🔒</span>') + '</div>' +
        '<div class="ch-body"><div class="ch-title">Chapter ' + c.num + ': ' + esc(c.title) + '</div><div class="ch-blurb">' + esc(c.blurb) + '</div></div>' +
        '<div class="ch-stats"><span>❓ ' + c.quiz.length + '</span><span>🃏 ' + c.cards.length + '</span>' + (p && p.done ? '<span class="best">best ' + p.best + '%</span>' : "") + '</div></a>';
    });
    h += '</div>';
    return shell("library", h);
  }

  /* ---------------- chapter view ---------------- */
  var CH = null; // {book, ch, idx, mode, qi, locked, streak, correct, xpThis, wasDone, answers:[]}
  function viewChapter(chId) {
    var found = chById(chId);
    if (!found) return viewLibrary();
    if (!isUnlocked(found.book, found.idx)) return viewBook(found.book.id);
    if (!CH || CH.ch.id !== chId) {
      CH = { book: found.book, ch: found.ch, idx: found.idx, mode: "lesson", qi: 0, locked: false, streak: 0, correct: 0, xpThis: 0, breakdown: [], wasDone: !!(prog(found.book.id, chId) && prog(found.book.id, chId).done), flipped: {} };
    }
    var c = CH.ch, b = CH.book;
    var h = '<div class="crumbs"><a href="#/library">Library</a> / <a href="#/book/' + b.id + '">' + esc(b.title) + '</a> / Chapter ' + c.num + '</div>';
    h += '<div class="chapter-head"><div class="badge-num" style="background:linear-gradient(135deg,' + b.color + ',#fb923c)">' + c.num + '</div>' +
      '<div><h1>' + esc(c.title) + '</h1><div class="meta"><b style="color:' + b.color + '">' + esc(b.short) + '</b> · Chapter ' + c.num + ' of ' + b.chapters.length + ' · ' + c.concepts.length + ' concepts · ' + c.quiz.length + ' questions · ' + c.cards.length + ' flashcards</div></div>' +
      '<div class="mode-tabs">' +
      tabBtn("lesson", "📖 Lesson", c.id) + tabBtn("quiz", "❓ Quiz", c.id) + tabBtn("cards", "🃏 Flashcards", c.id) +
      '</div></div>';
    if (CH.mode === "lesson") h += lessonHTML();
    else if (CH.mode === "quiz") h += quizHTML();
    else if (CH.mode === "results") h += resultsHTML();
    else if (CH.mode === "cards") h += cardsHTML();
    return shell("library", h);
  }
  function tabBtn(mode, label, chId) {
    return '<button class="mode-tab' + (CH.mode === mode ? " active" : "") + '" data-mode="' + mode + '" data-ch="' + chId + '">' + label + '</button>';
  }

  function lessonHTML() {
    var c = CH.ch;
    var h = '<div class="concept-list">';
    c.concepts.forEach(function (k, i) {
      h += '<div class="card concept"><div class="c-num">' + String(i + 1).padStart(2, "0") + ' / ' + String(c.concepts.length).padStart(2, "0") + '</div><h3>' + esc(k.t) + '</h3><p>' + esc(k.b) + '</p><div class="key"><b>Key takeaway:</b> ' + esc(k.k) + '</div></div>';
    });
    h += '</div><div class="lesson-actions"><button class="btn" data-mode="quiz" data-ch="' + c.id + '">❓ Start the quiz (' + c.quiz.length + ' questions)</button>' +
      '<button class="btn ghost" data-mode="cards" data-ch="' + c.id + '">🃏 Review flashcards</button>' +
      (CH.idx + 1 < CH.book.chapters.length ? '<a class="btn ghost" href="#/chapter/' + CH.book.chapters[CH.idx + 1].id + '">Next chapter →</a>' : '<a class="btn ghost" href="#/book/' + CH.book.id + '">Back to book →</a>') +
      '</div>';
    return h;
  }

  function startQuiz() {
    CH.mode = "quiz"; CH.qi = 0; CH.locked = false; CH.streak = 0; CH.correct = 0; CH.xpThis = 0; CH.breakdown = [];
    render();
  }
  function quizHTML() {
    var c = CH.ch, q = c.quiz[CH.qi];
    var total = c.quiz.length;
    var h = '<div class="quiz-wrap"><div class="quiz-top"><span class="q-count">Question ' + (CH.qi + 1) + ' / ' + total + '</span>' +
      '<div class="q-bar"><i style="width:' + pct(CH.qi, total) + '%"></i></div>' +
      (CH.streak > 1 ? '<span class="q-streak">🔥 streak ×' + CH.streak + '</span>' : '<span class="q-streak" style="color:var(--faint)">streak ×0</span>') + '</div>';
    h += '<div class="card q-card"><div class="q-text">' + esc(q.q) + '</div>';
    if (q.type === "chart" && q.shape) h += profileSVG(q.shape, 330);
    h += '<div class="opts">';
    q.o.forEach(function (opt, i) {
      var cls = "opt", letter = "ABCD"[i];
      if (CH.locked) {
        if (i === q.a) cls += " correct";
        else if (i === CH.picked) cls += " wrong";
      }
      h += '<button class="' + cls + '" data-i="' + i + '" ' + (CH.locked ? "disabled" : "") + '><span class="letter">' + letter + '</span><span>' + esc(opt) + '</span></button>';
    });
    h += '</div>';
    if (CH.locked) {
      var ok = CH.picked === q.a;
      var xpLine = ok ? "+" + CH.lastXp + " XP" : "+0 XP";
      h += '<div class="feedback show ' + (ok ? "good" : "bad") + '">' + (ok ? "✅ Correct! " : "❌ Not quite. ") + esc(q.x) + '<div class="xp-line ' + (ok ? "good" : "bad") + '">' + xpLine + (ok && CH.streak > 1 ? " (streak bonus included)" : "") + '</div></div>';
      h += '<div class="quiz-nav"><span class="muted" style="font-size:13px">' + CH.correct + ' / ' + (CH.qi + 1) + ' correct so far</span>' +
        '<button class="btn small" id="q-next">' + (CH.qi + 1 < total ? "Next question →" : "Finish & see results 🏁") + '</button></div>';
    }
    h += '</div></div>';
    return h;
  }
  function answer(i) {
    if (CH.locked) return;
    CH.locked = true; CH.picked = i;
    var q = CH.ch.quiz[CH.qi];
    var ok = i === q.a;
    if (ok) {
      CH.correct++;
      CH.lastXp = 10 + Math.min(CH.streak, 5) * 2;
      CH.streak++;
      CH.xpThis += CH.lastXp;
      CH.breakdown.push({ label: "Q" + (CH.qi + 1) + " correct" + (CH.streak > 1 ? " (streak ×" + (CH.streak - 1) + ")" : ""), xp: CH.lastXp });
    } else {
      CH.streak = 0;
      CH.breakdown.push({ label: "Q" + (CH.qi + 1) + " incorrect", xp: 0 });
    }
    render();
  }
  function finishQuiz() {
    var c = CH.ch, b = CH.book;
    var perfect = CH.correct === c.quiz.length;
    var firstBonus = CH.wasDone ? 0 : 30;
    var perfectBonus = perfect ? 40 : 0;
    var total = CH.xpThis + firstBonus + perfectBonus;
    CH.breakdown.push({ label: "Chapter completed" + (CH.wasDone ? " (replay)" : " — first completion bonus"), xp: firstBonus });
    if (perfect) CH.breakdown.push({ label: "💯 Perfect score bonus", xp: perfectBonus });
    S.xp += total;
    var prev = prog(b.id, c.id) || { done: false, best: 0, attempts: 0, xp: 0 };
    var score = pct(CH.correct, c.quiz.length);
    setProg(b.id, c.id, { done: true, best: Math.max(prev.best || 0, score), attempts: (prev.attempts || 0) + 1, xp: (prev.xp || 0) + total });
    save();
    checkBadges({ perfect: perfect });
    CH.mode = "results"; CH.earned = total; CH.perfect = perfect;
    render();
    confettiBurst(perfect ? 260 : 140);
  }
  function resultsHTML() {
    var c = CH.ch, b = CH.book;
    var score = pct(CH.correct, c.quiz.length);
    var medal = score === 100 ? "🏆" : score >= 70 ? "🎉" : score >= 50 ? "💪" : "📚";
    var h = '<div class="results card"><div class="medal">' + medal + '</div><h2>' + esc(c.title) + ' — complete!</h2>' +
      '<div class="score">You scored <b>' + score + '%</b> (' + CH.correct + ' / ' + c.quiz.length + ' correct)</div>' +
      '<div class="xp-break">';
    CH.breakdown.forEach(function (r) { h += '<div class="xp-row"><span>' + esc(r.label) + '</span><b>+' + r.xp + ' XP</b></div>'; });
    h += '<div class="xp-total"><span>Total earned</span><b>+' + CH.earned + ' XP</b></div></div>';
    var newB = badgeDefs().filter(function (bd) { return S.badges.indexOf(bd.id) !== -1 && CH._shown !== true; });
    h += '<div class="actions">' +
      '<button class="btn" data-mode="quiz" data-ch="' + c.id + '">🔁 Retake quiz</button>' +
      '<button class="btn ghost" data-mode="lesson" data-ch="' + c.id + '">📖 Review lesson</button>' +
      '<button class="btn teal" data-mode="cards" data-ch="' + c.id + '">🃏 Flashcards</button>' +
      (CH.idx + 1 < b.chapters.length && isUnlocked(b, CH.idx + 1)
        ? '<a class="btn" href="#/chapter/' + b.chapters[CH.idx + 1].id + '">Next chapter →</a>'
        : '<a class="btn" href="#/book/' + b.id + '">Book overview →</a>') +
      '</div></div>';
    return h;
  }

  function cardsHTML() {
    var c = CH.ch;
    var allFlipped = c.cards.every(function (cd) { return CH.flipped[cd.term]; });
    var h = '<p class="page-sub" style="margin-bottom:18px">Tap a card to flip it. Flip every card to earn a +10 XP review bonus.</p><div class="cards-grid">';
    c.cards.forEach(function (cd, i) {
      h += '<button class="fcard' + (CH.flipped[cd.term] ? " flipped" : "") + '" data-ci="' + i + '"><div class="inner">' +
        '<div class="face front"><div class="hint">Term</div><div class="t">' + esc(cd.term) + '</div><div class="hint">tap to flip</div></div>' +
        '<div class="face back"><div class="d">' + esc(cd.def) + '</div></div></div></button>';
    });
    h += '</div><div class="lesson-actions">' + (allFlipped ? '<span class="tag">✅ Review complete — bonus applied</span>' : '<span class="muted" style="font-size:13px">' + Object.keys(CH.flipped).length + ' / ' + c.cards.length + ' flipped</span>') +
      '<button class="btn" data-mode="quiz" data-ch="' + c.id + '">❓ Take the quiz</button>' +
      '<button class="btn ghost" data-mode="lesson" data-ch="' + c.id + '">📖 Lesson</button></div>';
    return h;
  }
  function flipCard(ci) {
    var c = CH.ch, cd = c.cards[ci];
    CH.flipped[cd.term] = true;
    if (c.cards.every(function (x) { return CH.flipped[x.term]; }) && !S.flash[c.id]) {
      S.flash[c.id] = true;
      S.xp += 10;
      save();
      checkBadges({});
      toast("🃏", "Flashcard review complete!", "+10 XP bonus for chapter " + c.num);
    }
    render();
  }

  /* ---------------- glossary & profile ---------------- */
  function viewGlossary(q) {
    var items = [];
    DATA.books.forEach(function (b) {
      b.chapters.forEach(function (c) {
        c.cards.forEach(function (cd) { items.push({ book: b, ch: c, term: cd.term, def: cd.def }); });
      });
    });
    var f = (q || "").toLowerCase();
    var filt = items.filter(function (it) { return !f || it.term.toLowerCase().indexOf(f) !== -1 || it.def.toLowerCase().indexOf(f) !== -1 || it.book.short.toLowerCase().indexOf(f) !== -1; });
    var h = '<h1 class="page-title">Glossary</h1><p class="page-sub">' + items.length + ' key terms from all four books. Search by term, definition or book.</p>';
    h += '<div style="height:18px"></div><input class="search" id="g-search" placeholder="🔍 Search terms… (e.g. POC, value area, excess)" value="' + esc(q || "") + '">';
    h += '<div id="g-results">' + glossHTML(filt) + '</div>';
    return shell("glossary", h);
  }
  function glossHTML(list) {
    if (!list.length) return '<div class="empty card">No terms match. Try “auction”, “POC”, “excess”…</div>';
    var byBook = {};
    list.forEach(function (it) { (byBook[it.book.id] = byBook[it.book.id] || { book: it.book, items: [] }).items.push(it); });
    var h = "";
    DATA.books.forEach(function (b) {
      var g = byBook[b.id];
      if (!g) return;
      h += '<div class="gloss-group"><h3 style="color:' + b.color + '">' + esc(b.title) + '</h3>';
      g.items.forEach(function (it) {
        h += '<div class="gloss-item"><div class="term">' + esc(it.term) + '</div><div class="def">' + esc(it.def) + ' <span class="muted" style="font-size:11px">— ' + esc(it.book.short) + ' Ch.' + it.ch.num + '</span></div></div>';
      });
      h += '</div>';
    });
    return h;
  }

  function viewProfile() {
    var r = rankOf(S.xp);
    var done = doneCount(), total = totalChapters();
    var h = '<h1 class="page-title">Your trader profile</h1><p class="page-sub">Rank, streaks, badges and book progress — all stored locally in this browser.</p><div style="height:22px"></div>';
    h += '<div class="row">';
    h += '<div class="card" style="padding:22px;flex:1;min-width:300px"><div class="section-h" style="margin-top:0"><h2>Rank ladder</h2></div><div class="rank-ladder">';
    RANKS.forEach(function (rk) {
      var cur = r.name === rk.name;
      h += '<div class="rank-row' + (cur ? " current" : "") + '"><span class="r-ico">' + rk.ico + '</span><span class="r-name">' + esc(rk.name) + '</span><span class="r-xp">' + rk.xp.toLocaleString() + ' XP</span></div>';
    });
    h += '</div></div>';
    h += '<div class="card" style="padding:22px;flex:1;min-width:300px"><div class="section-h" style="margin-top:0"><h2>Stats</h2></div>';
    h += '<div class="stats" style="margin-bottom:0">' +
      statCard("⚡", S.xp.toLocaleString(), "Total XP") +
      statCard("🔥", S.bestStreak + " days", "Best streak") +
      statCard("✅", done + " / " + total, "Chapters completed") +
      statCard("🎯", pct(done, total) + "%", "Academy progress") +
      '</div>' +
      '<div class="divider"></div><button class="btn danger small" id="reset-btn">🗑 Reset all progress</button></div>';
    h += '</div>';
    h += '<div class="section-h"><h2>Badges</h2></div><div class="badge-grid">';
    badgeDefs().forEach(function (b) {
      var earned = S.badges.indexOf(b.id) !== -1;
      h += '<div class="badge' + (earned ? " earned" : "") + '"><div class="b-ico">' + b.ico + '</div><div class="b-name">' + esc(b.name) + '</div><div class="b-desc">' + esc(b.desc) + '</div></div>';
    });
    h += '</div>';
    h += '<div class="section-h"><h2>Leaderboard <span class="sub">— simulated rivals</span></h2></div>' + leaderboardHTML();
    return shell("profile", h);
  }

  /* ---------------- router ---------------- */
  function render() {
    var hash = location.hash || "#/";
    var m;
    var html;
    if (hash.indexOf("#/chapter/") === 0) html = viewChapter(hash.slice(10));
    else if (hash.indexOf("#/book/") === 0) html = viewBook(hash.slice(7));
    else if (hash === "#/library") html = viewLibrary();
    else if (hash === "#/glossary") html = viewGlossary(viewGlossary.q || "");
    else if (hash === "#/profile") html = viewProfile();
    else html = viewDashboard();
    el("app").innerHTML = html;
    window.scrollTo(0, 0);
    bind();
  }
  function bind() {
    document.querySelectorAll("[data-mode]").forEach(function (b) {
      b.addEventListener("click", function () {
        var mode = b.getAttribute("data-mode");
        if (mode === "quiz") startQuiz();
        else { CH.mode = mode; render(); }
      });
    });
    document.querySelectorAll(".opt").forEach(function (b) {
      b.addEventListener("click", function () { answer(parseInt(b.getAttribute("data-i"), 10)); });
    });
    var nx = el("q-next");
    if (nx) nx.addEventListener("click", function () {
      if (CH.qi + 1 < CH.ch.quiz.length) { CH.qi++; CH.locked = false; render(); }
      else finishQuiz();
    });
    document.querySelectorAll(".fcard").forEach(function (b) {
      b.addEventListener("click", function () { flipCard(parseInt(b.getAttribute("data-ci"), 10)); });
    });
    var gs = el("g-search");
    if (gs) gs.addEventListener("input", function () {
      viewGlossary.q = gs.value;
      var res = el("g-results");
      var items = [];
      DATA.books.forEach(function (b) { b.chapters.forEach(function (c) { c.cards.forEach(function (cd) { items.push({ book: b, ch: c, term: cd.term, def: cd.def }); }); }); });
      var f = gs.value.toLowerCase();
      var filt = items.filter(function (it) { return !f || it.term.toLowerCase().indexOf(f) !== -1 || it.def.toLowerCase().indexOf(f) !== -1; });
      res.innerHTML = glossHTML(filt);
    });
    var rb = el("reset-btn");
    if (rb) rb.addEventListener("click", function () {
      if (confirm("Reset all XP, streaks, badges and chapter progress?")) {
        S = defaultState(); save(); CH = null; render();
        toast("🗑", "Progress reset", "Fresh start — good luck, trader!");
      }
    });
  }

  addEventListener("hashchange", render);
  render();
})();

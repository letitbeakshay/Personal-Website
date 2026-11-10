(function () {
  var root = document.documentElement;
  var body = document.body;
  var base = body.getAttribute("data-root") || "";
  var page = body.getAttribute("data-page") || "";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  window.esc = esc;

  var KINDS = { thought: "Thought", resource: "Resource", memory: "Memory", decision: "Decision" };
  window.KINDS = KINDS;
  window.fmtDate = function (iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };
  window.fmtDay = function (iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  // Sidebar
  var count = (window.ARCHIVE || []).length;
  var items = [
    ["start", "", "Start"], ["story", "story/", "Story"], ["now", "now/", "Now"],
    ["archive", "archive/", "Archive", count ? String(count) : ""], ["proofs", "proofs/", "Proofs"]
  ];
  var nav = items.map(function (i) {
    var cur = i[0] === page ? ' aria-current="page"' : "";
    return '<li><a href="' + base + i[1] + '"' + cur + ">" + i[2] + (i[3] ? " <small>" + i[3] + "</small>" : "") + "</a></li>";
  }).join("");

  var aside = document.getElementById("side");
  if (aside) {
    aside.innerHTML =
      '<div class="side-top">' +
        '<a class="me" href="' + base + '" aria-label="Akshay, home"><div class="avatar" aria-hidden="true">A</div>' +
        '<div><b>Akshay</b><span>Co-founder, Record</span></div></a>' +
        '<button class="icon-btn menu-btn" id="menu" aria-label="Toggle menu" aria-expanded="false">☰</button>' +
      "</div>" +
      '<div class="groups"><p class="label">Navigate</p><nav aria-label="Primary"><ul>' + nav + "</ul></nav></div>" +
      '<div class="side-foot"><span>akshay.world</span>' +
      '<button class="icon-btn theme" aria-label="Toggle light and dark theme">◐</button></div>';

    document.getElementById("menu").addEventListener("click", function () {
      var open = aside.classList.toggle("open");
      this.setAttribute("aria-expanded", open);
    });
    aside.querySelector(".theme").addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
  var top = document.getElementById("top");
  if (top) top.addEventListener("click", function () { scrollTo({ top: 0 }); });

  // Shared row renderer
  window.rowHTML = function (e) {
    return '<li><a class="row" href="' + base + 'archive/entry.html?id=' + encodeURIComponent(e.id) + '">' +
      "<time datetime=\"" + esc(e.date) + "\">" + fmtDay(e.date) + "</time>" +
      "<div><h3>" + esc(e.title) + "</h3><p>" + esc(e.summary) + "</p></div>" +
      '<span class="kind">' + esc(KINDS[e.kind] || e.kind) + "</span></a></li>";
  };

  // Random entry
  window.randomEntryURL = function () {
    var a = window.ARCHIVE || []; if (!a.length) return base + "archive/";
    return base + "archive/entry.html?id=" + encodeURIComponent(a[Math.floor(Math.random() * a.length)].id);
  };
  document.querySelectorAll("[data-random]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); location.href = randomEntryURL(); });
  });

  // Live clock in the header line
  var clock = document.getElementById("clock");
  if (clock && window.SITE) {
    var tick = function () {
      try {
        clock.textContent = new Date().toLocaleTimeString("en-GB", { timeZone: SITE.tz, hour12: false }) + " " + SITE.tzLabel;
      } catch (e) { clock.textContent = ""; }
    };
    tick(); setInterval(tick, 1000);
  }

  // Press C to copy email (only when an email is configured)
  var hint = document.getElementById("copy-email");
  if (hint && window.SITE && SITE.email) {
    hint.hidden = false;
    document.addEventListener("keydown", function (e) {
      if (e.key.toLowerCase() !== "c" || e.metaKey || e.ctrlKey || e.altKey) return;
      var t = e.target.tagName; if (t === "INPUT" || t === "TEXTAREA") return;
      navigator.clipboard.writeText(SITE.email).then(function () {
        var k = hint.querySelector("[data-msg]"); if (k) { k.textContent = "copied"; setTimeout(function () { k.textContent = "to copy my email"; }, 1600); }
      });
    });
  }
})();

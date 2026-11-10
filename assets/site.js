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

  var KINDS = { thought: "Thought", resource: "Resource", memory: "Memory", experiment: "Experiment" };
  window.KINDS = KINDS;
  window.SECTION = { thought: "thoughts/", resource: "resources/", memory: "memories/", experiment: "experiments/" };
  window.fmtDate = function (iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };
  window.fmtDay = function (iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  // Sidebar
  var E = window.ENTRIES || [];
  function n(k) { return String(E.filter(function (e) { return e.kind === k; }).length); }
  var items = [
    ["start", "", "Start"], ["about", "about/", "About"],
    ["thoughts", "thoughts/", "Thoughts", n("thought")], ["resources", "resources/", "Resources", n("resource")],
    ["memories", "memories/", "Memories", n("memory")], ["experiments", "experiments/", "Experiments", n("experiment")], ["talk", "talk/", "Let's talk"]
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

  // Shared row renderer. label: text for the right-hand chip (defaults to the entry's type).
  window.rowHTML = function (e, label) {
    return '<li><a class="row" href="' + base + 'entry/?id=' + encodeURIComponent(e.id) + '">' +
      "<time datetime=\"" + esc(e.date) + "\">" + fmtDay(e.date) + "</time>" +
      "<div><h3>" + esc(e.title) + "</h3><p>" + esc(e.summary) + "</p></div>" +
      '<span class="kind">' + esc(label || KINDS[e.kind] || e.kind) + "</span></a></li>";
  };

  // Collection page: entries of one kind, grouped by year, with search and tag filters.
  window.renderCollection = function (kind) {
    var tag = "all", term = "";
    var list = E.filter(function (e) { return e.kind === kind; });
    var tags = []; list.forEach(function (e) { if (tags.indexOf(e.tag) < 0) tags.push(e.tag); });
    var chips = document.getElementById("chips"), out = document.getElementById("out");
    chips.innerHTML = ["all"].concat(tags).map(function (t) {
      return '<button class="chip" type="button" data-t="' + esc(t) + '" aria-pressed="' + (t === "all") + '">' + (t === "all" ? "All" : esc(t)) + "</button>";
    }).join("");
    function render() {
      var rows = list.filter(function (e) {
        var hay = (e.title + " " + e.summary + " " + e.body.join(" ")).toLowerCase();
        return (tag === "all" || e.tag === tag) && hay.indexOf(term) !== -1;
      }).sort(function (a, b) { return b.date.localeCompare(a.date); });
      if (!rows.length) { out.innerHTML = '<p class="empty">Nothing here yet.</p>'; return; }
      var html = "", cur = "";
      rows.forEach(function (e) {
        var y = e.date.slice(0, 4);
        if (y !== cur) { if (cur) html += "</ul>"; html += '<div class="month">' + y + '</div><ul class="rows">'; cur = y; }
        html += rowHTML(e, e.tag);
      });
      out.innerHTML = html + "</ul>";
    }
    chips.addEventListener("click", function (ev) {
      var b = ev.target.closest(".chip"); if (!b) return;
      tag = b.getAttribute("data-t");
      chips.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === b); });
      render();
    });
    document.getElementById("q").addEventListener("input", function () { term = this.value.trim().toLowerCase(); render(); });
    render();
  };

  // Random entry
  window.randomEntryURL = function () {
    if (!E.length) return base;
    return base + "entry/?id=" + encodeURIComponent(E[Math.floor(Math.random() * E.length)].id);
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

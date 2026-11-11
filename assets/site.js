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

  var KINDS = { thought: "Thought", resource: "Resource", memory: "Memory", faith: "Faith", experiment: "Experiment" };
  window.KINDS = KINDS;
  window.SECTION = { thought: "notes/", resource: "notes/", memory: "notes/", faith: "faith/", experiment: "experiments/" };
  window.fmtDate = function (iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };
  window.fmtDay = function (iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };


  // ---- Data: entries and page text come from Supabase. If that fails, the built-in placeholders in data.js stay in place.
  window.LIVE = false;
  function mapRow(r) {
    var body = String(r.body || "").split(/\n\s*\n/).map(function (x) { return x.trim(); }).filter(Boolean);
    var words = body.join(" ").split(/\s+/).filter(Boolean).length;
    return { id: r.id, kind: r.kind, tag: r.tag || "", date: String(r.date).slice(0, 10), title: r.title, summary: r.summary || "",
             body: body, read: Math.max(1, Math.ceil(words / 200)), hypothesis: r.hypothesis || "", result: r.result || "" };
  }
  window.DATA_READY = new Promise(function (resolve) {
    var C = window.CONFIG;
    if (!C || !C.SUPABASE_URL) { resolve(); return; }
    var ctl = new AbortController(), timer = setTimeout(function () { ctl.abort(); }, 7000);
    var get = function (t, q) {
      return fetch(C.SUPABASE_URL + "/rest/v1/" + t + "?" + q, { headers: { apikey: C.SUPABASE_KEY }, signal: ctl.signal })
        .then(function (r) { if (!r.ok) throw new Error(t); return r.json(); });
    };
    Promise.all([get("entries", "select=*&order=date.desc"), get("content", "select=*")]).then(function (res) {
      window.ENTRIES = res[0].map(mapRow);
      window.CONTENT = {}; res[1].forEach(function (r) { window.CONTENT[r.key] = r.value; });
      var site = window.CONTENT.site;
      if (site && window.SITE) {
        if (typeof site.email === "string") SITE.email = site.email;
        if (Array.isArray(site.socials)) SITE.socials = site.socials;
      }
      window.LIVE = true;
    }).catch(function () {}).then(function () { clearTimeout(timer); resolve(); });
  });
  window.whenData = function (cb) { window.DATA_READY.then(cb); };

  // Page text from the admin panel. Elements with data-content="key" are filled in; unused placeholders are removed once live.
  whenData(function () {
    if (!window.LIVE) return;
    document.querySelectorAll(".demo").forEach(function (el) { el.remove(); });
    document.querySelectorAll("[data-content]").forEach(function (el) {
      var v = (window.CONTENT || {})[el.getAttribute("data-content")];
      if (typeof v === "string" && v.trim()) {
        if (el.hasAttribute("data-paras")) {
          el.innerHTML = v.split(/\n\s*\n/).map(function (t) { return '<p class="prose">' + esc(t.trim()).replace(/\n/g, "<br>") + "</p>"; }).join("");
        } else { el.textContent = v.trim(); }
      } else if (el.hasAttribute("data-ph")) { el.remove(); }
    });
  });

  window.setPage = function (id) {
    document.querySelectorAll("nav a[data-p]").forEach(function (a) {
      if (a.getAttribute("data-p") === id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  };

  // Sidebar
  var IC = {
    start: '<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/>',
    about: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6"/>',
    notes: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h5M10 16h5"/>',
    experiments: '<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M8 15h8"/>',
    faith: '<path d="M12 3v18"/><path d="M7 8h10"/>',
    talk: '<path d="M5 5h14v10H10l-5 4z"/>'
  };
  var items = [
    ["start", "", "Start"], ["about", "about/", "About"],
    ["notes", "notes/", "Notes"], ["experiments", "experiments/", "Experiments"],
    ["faith", "faith/", "Faith"], ["talk", "talk/", "Let's talk"]
  ];
  var nav = items.map(function (i) {
    var cur = i[0] === page ? ' aria-current="page"' : "";
    return '<li><a href="' + base + i[1] + '" data-p="' + i[0] + '"' + cur + '><svg class="ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC[i[0]] + "</svg><span>" + i[2] + "</span></a></li>";
  }).join("");

  var aside = document.getElementById("side");
  if (aside) {
    aside.innerHTML =
      '<div class="side-top">' +
        '<a class="mark" href="' + base + '" aria-label="Home"><i></i></a>' +
        '<button class="icon-btn menu-btn" id="menu" aria-label="Toggle menu" aria-expanded="false">Menu</button>' +
      "</div>" +
      '<div class="groups"><nav aria-label="Primary"><ul>' + nav + "</ul></nav></div>" +
      '<div class="side-foot"><button class="theme-btn theme" aria-label="Toggle light and dark theme"><span class="tdot"></span><span>Theme</span></button></div>';

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


  // List page with search and filter chips. opts: filter(entry), label(entry) used for the chips and the right-hand label.
  window.renderCollection = function (opts) { whenData(function () {
    var pick = "all", term = "";
    var list = (window.ENTRIES || []).filter(opts.filter).sort(function (a, b) { return b.date.localeCompare(a.date); });
    var labels = []; list.forEach(function (e) { var l = opts.label(e); if (labels.indexOf(l) < 0) labels.push(l); });
    var chips = document.getElementById("chips"), out = document.getElementById("idx");
    chips.innerHTML = ["all"].concat(labels).map(function (l) {
      return '<button class="chip" type="button" data-l="' + esc(l) + '" aria-pressed="' + (l === "all") + '">' + (l === "all" ? "All" : esc(l)) + "</button>";
    }).join("");
    function render() {
      var rows = list.filter(function (e) {
        var hay = (e.title + " " + e.summary + " " + e.body.join(" ")).toLowerCase();
        return (pick === "all" || opts.label(e) === pick) && hay.indexOf(term) !== -1;
      });
      out.innerHTML = rows.length ? rows.map(function (e) {
        return '<li><a href="' + base + 'entry/?id=' + encodeURIComponent(e.id) + '"><time datetime="' + esc(e.date) + '">' + fmtDate(e.date) + "</time><span>" + esc(e.title) + "</span><em>" + esc(opts.label(e)) + "</em></a></li>";
      }).join("") : '<li class="empty">Nothing here yet.</li>';
    }
    chips.addEventListener("click", function (ev) {
      var b = ev.target.closest(".chip"); if (!b) return;
      pick = b.getAttribute("data-l");
      chips.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === b); });
      render();
    });
    document.getElementById("q").addEventListener("input", function () { term = this.value.trim().toLowerCase(); render(); });
    render();
  }); };

  // Random entry
  window.randomEntryURL = function () {
    var E = window.ENTRIES || [];
    if (!E.length) return base;
    return base + "entry/?id=" + encodeURIComponent(E[Math.floor(Math.random() * E.length)].id);
  };
  document.querySelectorAll("[data-random]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); location.href = randomEntryURL(); });
  });


  // Press C to copy email (only when an email is set)
  whenData(function () {
    var hint = document.getElementById("copy-email");
    if (!hint || !window.SITE || !SITE.email) return;
    hint.hidden = false;
    document.addEventListener("keydown", function (e) {
      if (e.key.toLowerCase() !== "c" || e.metaKey || e.ctrlKey || e.altKey) return;
      var t = e.target.tagName; if (t === "INPUT" || t === "TEXTAREA") return;
      navigator.clipboard.writeText(SITE.email).then(function () {
        var k = hint.querySelector("[data-msg]"); if (k) { k.textContent = "copied"; setTimeout(function () { k.textContent = "to copy my email"; }, 1600); }
      });
    });
  });
})();

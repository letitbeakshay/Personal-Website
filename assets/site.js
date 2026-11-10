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
    ["archive", "archive/", "Archive", count ? String(count) : ""], ["proofs", "proofs/", "Proofs"],
    ["private", "private/", "Private", "locked"]
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
})();

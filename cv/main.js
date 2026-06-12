/* ============================================================
   Виртуальное резюме — interactivity
   i18n · counters · reveal · timeline truck · routes · contacts
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- i18n RU / EN ---------- */
  var TITLES = {
    ru: "Семенов Евгений — Менеджер по логистике и ВЭД",
    en: "Evgeny Semenov — Logistics & Foreign-Trade Manager"
  };
  var lang = localStorage.getItem("cv-lang") || "ru";

  // Update only the element's own text, preserving child elements
  // (e.g. appended "%", ASMAP tags) that other code may have added.
  function setI18nText(el, val) {
    for (var i = 0; i < el.childNodes.length; i++) {
      if (el.childNodes[i].nodeType === 3) { el.childNodes[i].nodeValue = val; return; }
    }
    el.insertBefore(document.createTextNode(val), el.firstChild);
  }

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    document.title = TITLES[l] || TITLES.ru;

    document.querySelectorAll("[data-ru]").forEach(function (el) {
      var val = el.getAttribute("data-" + l);
      if (val != null) setI18nText(el, val);
    });

    // language-aware number prefixes (e.g. "до " / "up to ")
    document.querySelectorAll("[data-prefix-" + l + "]").forEach(function (el) {
      el.setAttribute("data-prefix", el.getAttribute("data-prefix-" + l) || "");
    });
    // re-render any already-counted stats with the new prefix
    document.querySelectorAll(".stat-num[data-final]").forEach(function (el) {
      renderStat(el, parseInt(el.getAttribute("data-final"), 10));
    });

    document.querySelectorAll("#lang-toggle [data-lang]").forEach(function (s) {
      s.classList.toggle("active", s.getAttribute("data-lang") === l);
    });
    localStorage.setItem("cv-lang", l);
  }

  var toggle = document.getElementById("lang-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      applyLang(lang === "ru" ? "en" : "ru");
    });
  }

  /* ---------- reveal on scroll + section triggers ---------- */
  function fillBars(scope) {
    scope.querySelectorAll(".bar").forEach(function (b) {
      b.classList.add("filled");
    });
  }

  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.querySelector && e.target.querySelector(".bar")) fillBars(e.target);
        if (e.target.matches(".stat")) countStat(e.target.querySelector(".stat-num"));
        io.unobserve(e.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(".reveal, #geography").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal, #geography").forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll(".bar").forEach(function (b) { b.classList.add("filled"); });
    document.querySelectorAll(".stat-num[data-count]").forEach(function (el) {
      el.setAttribute("data-final", el.getAttribute("data-count"));
      renderStat(el, parseInt(el.getAttribute("data-count"), 10));
    });
  }

  /* ---------- count-up stats ---------- */
  function renderStat(el, value) {
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    el.textContent = prefix + value + suffix;
  }

  function countStat(el) {
    if (!el || !el.hasAttribute("data-count")) return;
    var target = parseInt(el.getAttribute("data-count"), 10);
    el.setAttribute("data-final", target);
    if (prefersReduced) { renderStat(el, target); return; }
    var dur = 1300, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      renderStat(el, Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- skill bars: build track + fill + % ---------- */
  document.querySelectorAll(".bar[data-pct]").forEach(function (bar) {
    var pct = bar.getAttribute("data-pct");
    bar.style.setProperty("--pct", pct + "%");
    var label = bar.querySelector("span");
    if (label) {
      var em = document.createElement("em");
      em.className = "pct";
      em.textContent = pct + "%";
      label.appendChild(em);
    }
    var track = document.createElement("i");
    track.className = "track";
    var fill = document.createElement("i");
    fill.className = "fill";
    track.appendChild(fill);
    bar.appendChild(track);
  });

  /* ---------- timeline truck follows scroll ---------- */
  var timeline = document.querySelector(".timeline");
  var tlTruck = document.querySelector(".tl-truck");
  var ticking = false;

  function updateTruck() {
    ticking = false;
    if (!timeline || !tlTruck) return;
    var rect = timeline.getBoundingClientRect();
    var vh = window.innerHeight;
    var progress = (vh * 0.5 - rect.top) / rect.height;
    progress = Math.max(0, Math.min(1, progress));
    var maxTop = timeline.clientHeight - tlTruck.offsetHeight;
    tlTruck.style.top = (progress * maxTop) + "px";
  }

  function updateProgressBar() {
    var bar = document.getElementById("scroll-progress");
    if (!bar) return;
    var h = document.documentElement;
    var scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    bar.style.width = (scrolled * 100) + "%";
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateTruck();
      updateProgressBar();
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateTruck, { passive: true });

  /* ---------- anti-spam contacts (reveal on click) ---------- */
  var TEL_B64 = "Kzc5NjQzNjI3MjEx";
  var EMAIL_B64 = "c2VtZW5vdmV1Z2VuZUByYW1ibGVyLnJ1";
  function dec(b) { try { return atob(b); } catch (e) { return ""; } }
  function fmtPhone(p) {
    // +79643627211 -> +7 964 362-72-11
    var m = p.match(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/);
    return m ? "+7 " + m[1] + " " + m[2] + "-" + m[3] + "-" + m[4] : p;
  }
  function revealContact(btnId, href, text) {
    var btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (btn.classList.contains("revealed")) return;
      var label = btn.querySelector(".cc-label");
      var a = document.createElement("a");
      a.href = href;
      a.textContent = text;
      a.style.color = "var(--amber)";
      a.addEventListener("click", function (e) { e.stopPropagation(); });
      label.innerHTML = "";
      label.appendChild(a);
      label.removeAttribute("data-ru");
      label.removeAttribute("data-en");
      btn.classList.add("revealed");
    });
  }
  (function () {
    var tel = dec(TEL_B64);
    var email = dec(EMAIL_B64);
    revealContact("reveal-phone", "tel:" + tel, fmtPhone(tel));
    revealContact("reveal-email", "mailto:" + email, email);
  })();

  /* ---------- footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- init ---------- */
  applyLang(lang);
  updateTruck();
  updateProgressBar();
})();

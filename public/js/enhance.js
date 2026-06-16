/* =====================================================================
   ENHANCE.JS  —  Wow-factor interactivity layer
   Loaded after main.js on every page. Self-contained IIFEs; each guards
   its own preconditions so it is safe to run on any page.
   ===================================================================== */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;

  /* ---------------------------------------------------------------- */
  /* 1. Page intro overlay — quick branded loader, fades out on load   */
  /* ---------------------------------------------------------------- */
  (function intro() {
    if (reduceMotion) return;
    // Skip if user already saw it this session (snappier internal nav)
    if (sessionStorage.getItem('zebros-intro')) return;

    var ov = document.createElement('div');
    ov.id = 'intro-overlay';
    ov.innerHTML =
      '<div class="intro-mark">' +
        '<div class="intro-ring">' +
          '<svg viewBox="0 0 100 100"><circle class="ring-track" cx="50" cy="50" r="45"/>' +
          '<circle class="ring-arc" cx="50" cy="50" r="45"/></svg>' +
          '<span class="ring-z">Z</span>' +
        '</div>' +
        '<div class="intro-word">ZEBROS</div>' +
        '<div class="intro-sub">TEAM 30415</div>' +
      '</div>';
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';

    function done() {
      ov.classList.add('intro-done');
      document.body.style.overflow = '';
      sessionStorage.setItem('zebros-intro', '1');
      setTimeout(function () { ov.remove(); }, 800);
    }
    // Minimum on-screen time so it reads as intentional, not a stutter
    var start = Date.now();
    window.addEventListener('load', function () {
      var wait = Math.max(0, 900 - (Date.now() - start));
      setTimeout(done, wait);
    });
    // Hard safety net
    setTimeout(done, 3500);
  })();

  /* ---------------------------------------------------------------- */
  /* 2. Hero aurora blobs + floating particle canvas                   */
  /* ---------------------------------------------------------------- */
  (function heroFx() {
    var hero = document.querySelector('.hero');
    if (!hero || reduceMotion) return;

    // Aurora blobs
    var aurora = document.createElement('div');
    aurora.className = 'hero-aurora';
    aurora.setAttribute('aria-hidden', 'true');
    aurora.innerHTML = '<span class="a1"></span><span class="a2"></span><span class="a3"></span>';
    hero.appendChild(aurora);

    // Particle field
    var canvas = document.createElement('canvas');
    canvas.className = 'hero-particles';
    canvas.setAttribute('aria-hidden', 'true');
    hero.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var parts = [];
    var W = 0, H = 0;

    function resize() {
      W = hero.clientWidth; H = hero.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var target = Math.min(46, Math.round(W / 26));
      parts = [];
      for (var i = 0; i < target; i++) {
        parts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 2 + 0.6,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          a: Math.random() * 0.5 + 0.2
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 31, 143, ' + p.a + ')';
        ctx.shadowColor = 'rgba(255, 31, 143, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    var raf;
    resize();
    tick();
    window.addEventListener('resize', resize, { passive: true });

    // Pause when hero scrolls out of view (saves battery)
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { if (!raf) tick(); }
          else { cancelAnimationFrame(raf); raf = null; }
        });
      }, { threshold: 0 }).observe(hero);
    }
  })();

  /* ---------------------------------------------------------------- */
  /* 3. Cursor spotlight glow + 3D tilt on cards                       */
  /* ---------------------------------------------------------------- */
  (function cardFx() {
    if (coarse) return;
    var spotSel = '.person-card, .pillar, .tier, .card, .featured-blog, .cta-big, .stat-big-item';
    var spots = document.querySelectorAll(spotSel);
    spots.forEach(function (el) {
      el.classList.add('fx-spot');
      var glow = document.createElement('span');
      glow.className = 'fx-glow';
      glow.setAttribute('aria-hidden', 'true');
      el.appendChild(glow);
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    // 3D tilt only on elements without an aggressive hover-translate
    if (!reduceMotion) {
      var tiltSel = '.pillar, .tier, .stat-big-item';
      document.querySelectorAll(tiltSel).forEach(function (el) {
        el.classList.add('fx-tilt');
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty('--rx', (px * 7).toFixed(2) + 'deg');
          el.style.setProperty('--ry', (-py * 7).toFixed(2) + 'deg');
        });
        el.addEventListener('pointerleave', function () {
          el.style.setProperty('--rx', '0deg');
          el.style.setProperty('--ry', '0deg');
        });
      });
    }
  })();

  /* ---------------------------------------------------------------- */
  /* 4. Directional reveal for opt-in [data-reveal] elements           */
  /* ---------------------------------------------------------------- */
  (function dataReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in-view'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  })();

  /* ---------------------------------------------------------------- */
  /* 5. Back-to-top button with scroll-progress ring                   */
  /* ---------------------------------------------------------------- */
  (function toTop() {
    var btn = document.createElement('button');
    btn.id = 'to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML =
      '<svg class="ring" viewBox="0 0 56 56"><circle class="tt-track" cx="28" cy="28" r="25"/>' +
      '<circle class="tt-arc" cx="28" cy="28" r="25"/></svg>' +
      '<span class="tt-arrow">↑</span>';
    document.body.appendChild(btn);
    var arc = btn.querySelector('.tt-arc');
    var LEN = 157;

    var ticking = false;
    function update() {
      var sh = document.documentElement.scrollHeight - window.innerHeight;
      var pct = sh > 0 ? window.scrollY / sh : 0;
      arc.style.strokeDashoffset = (LEN * (1 - pct)).toFixed(1);
      btn.classList.toggle('show', window.scrollY > 500);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    update();
  })();

  /* ---------------------------------------------------------------- */
  /* 6. Tilt the modal photo slightly as the pointer moves (depth)     */
  /* ---------------------------------------------------------------- */
  (function modalDepth() {
    if (coarse || reduceMotion) return;
    document.addEventListener('pointermove', function (e) {
      var modal = document.querySelector('.modal-overlay.open .modal');
      if (!modal) return;
      var photo = modal.querySelector('.modal-photo img');
      if (!photo) return;
      var px = (e.clientX / window.innerWidth - 0.5);
      var py = (e.clientY / window.innerHeight - 0.5);
      photo.style.transform = 'scale(1.06) translate(' + (px * 10).toFixed(1) + 'px,' + (py * 10).toFixed(1) + 'px)';
    });
  })();
})();

// ============ Mark active nav link ============
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });
})();

// ============ Mobile nav toggle ============
(function () {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

// ============ Navbar shrink on scroll ============
(function () {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });
})();

// ============ Reveal on scroll ============
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('in-view'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => obs.observe(el));
})();

// ============ Animated number counters ============
(function () {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length || !('IntersectionObserver' in window)) {
    nums.forEach(n => n.textContent = n.dataset.count);
    return;
  }
  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const isFloat = !Number.isInteger(target);
    const duration = 1400;
    const start = performance.now();
    const step = (t) => {
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = target * eased;
      el.textContent = isFloat ? val.toFixed(1) : Math.floor(val).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
    };
    requestAnimationFrame(step);
  };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animate(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
})();

// ============ Team tabs (past seasons) ============
(function () {
  const tabs = document.querySelectorAll('.team-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.team;
      document.querySelectorAll('.team-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.team-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + id)?.classList.add('active');
    });
  });
})();

// ============ Parallax tilt on cards ============
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ============ Set current year in footer ============
(function () {
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();

// ============ Cursor follower (Apple-style gradient glow) ============
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const follower = document.createElement('div');
  follower.className = 'cursor-follower';
  document.body.appendChild(follower);
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;
  let active = false;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!active) { active = true; follower.classList.add('active'); }
  });
  document.addEventListener('mouseleave', () => {
    active = false; follower.classList.remove('active');
  });
  document.querySelectorAll('a, button, .person-card, .pillar, .tier').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hover-link'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hover-link'));
  });
  (function tick() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    follower.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  })();
})();

// ============ Scroll progress bar ============
(function () {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  let ticking = false;
  function update() {
    const sh = document.documentElement.scrollHeight - window.innerHeight;
    const pct = sh > 0 ? (window.scrollY / sh) * 100 : 0;
    bar.style.width = pct + '%';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

// ============ Magnetic buttons ============
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();

// ============ Subtle parallax on hero elements ============
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = document.querySelectorAll('[data-parallax]');
  if (!els.length) return;
  let ticking = false;
  function update() {
    const y = window.scrollY;
    els.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();

// ============ Profile modal (clickable people cards) ============
(function () {
  const cards = document.querySelectorAll('.person-card[data-bio]');
  if (!cards.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalName">
      <button class="modal-close" aria-label="Close profile">×</button>
      <div class="modal-photo"><div class="placeholder-initials" data-modal-initials></div></div>
      <div class="modal-body">
        <h2 id="modalName" class="modal-name" data-modal-name></h2>
        <div class="modal-role" data-modal-role></div>
        <p class="modal-bio" data-modal-bio></p>
        <div class="modal-contact" data-modal-contact></div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('.modal-close');
  const elPhoto = overlay.querySelector('.modal-photo');
  const elName = overlay.querySelector('[data-modal-name]');
  const elRole = overlay.querySelector('[data-modal-role]');
  const elBio = overlay.querySelector('[data-modal-bio]');
  const elContact = overlay.querySelector('[data-modal-contact]');
  let lastFocused = null;

  function openModal(card) {
    lastFocused = document.activeElement;
    elPhoto.innerHTML = '';
    if (card.dataset.photo) {
      const img = document.createElement('img');
      img.src = card.dataset.photo;
      img.alt = card.dataset.name || '';
      elPhoto.appendChild(img);
    } else {
      const div = document.createElement('div');
      div.className = 'placeholder-initials';
      div.textContent = card.dataset.initials || '';
      elPhoto.appendChild(div);
    }
    elName.textContent = card.dataset.name || '';
    elRole.textContent = card.dataset.role || '';
    elBio.textContent = card.dataset.bio || '';

    elContact.innerHTML = '';
    if (card.dataset.email) {
      const row = document.createElement('div');
      row.className = 'modal-contact-item';
      const email = card.dataset.email;
      row.innerHTML = `<strong>Email:</strong><a href="mailto:${email}">${email}</a>`;
      elContact.appendChild(row);
    }
    if (card.dataset.phone) {
      const row = document.createElement('div');
      row.className = 'modal-contact-item';
      const phone = card.dataset.phone;
      const tel = phone.replace(/[^0-9+]/g, '');
      row.innerHTML = `<strong>Phone:</strong><a href="tel:${tel}">${phone}</a>`;
      elContact.appendChild(row);
    }
    if (card.dataset.discord) {
      const row = document.createElement('div');
      row.className = 'modal-contact-item';
      row.innerHTML = `<strong>Discord:</strong><span>${card.dataset.discord}</span>`;
      elContact.appendChild(row);
    }

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(() => closeBtn.focus(), 50);
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  cards.forEach(card => {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View profile for ${card.dataset.name || 'team member'}`);
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
})();

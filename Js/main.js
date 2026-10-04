/* ============================================================
   PitchBot — main.js
   ============================================================ */
'use strict';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ── 1. Nav: scrolled state + mobile menu ────────────────── */
(function () {
  const nav    = $('#nav');
  const burger = $('#burger');
  const menu   = $('#mobileMenu');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  if (!burger || !menu) return;

  const close = () => {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
  };

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
  });

  $$('.nav__mobile a').forEach(a => a.addEventListener('click', close));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) close();
  });
})();

/* ── 2. Anchor scrolling ─────────────────────────────────── */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const t = $(id);
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── 3. Hero entrance ────────────────────────────────────── */
(function () {
  const bits = $$('.badge, .hero__h1, .btn--hero, .mockup');
  if (!bits.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  bits.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity .55s ease ${i * 90}ms, transform .55s ease ${i * 90}ms`;
  });

  requestAnimationFrame(() => {
    bits.forEach(el => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  });
})();

/* ── 4. Scroll animations ────────────────────────────────── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  $$('.feature-card, .tech-item, .stat-card, .omni-card, .faq__item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });
})();

/* ── 5. Form submission ──────────────────────────────────── */
(function () {
  const form = $('.join__form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('.join__input');
    if (input && input.value) {
      alert(`Thanks for your interest! We'll contact you at ${input.value}`);
      input.value = '';
    }
  });
})();

/* ── 6. Rail button interactions ─────────────────────────── */
(function () {
  const railBtns = $$('.rail__btn');
  if (!railBtns.length) return;

  railBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      railBtns.forEach(b => b.classList.remove('rail__btn--on'));
      this.classList.add('rail__btn--on');
    });
  });
})();
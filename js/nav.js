/* =============================================
   nav.js — Shared navigation logic
   ============================================= */

(function () {
  'use strict';

  /* ---- Active nav link based on current page ---- */
  function setActiveLink() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.remove('active');
      const href = a.getAttribute('href');
      if (
        (page === 'index.html' || page === '' || page === '/') && href === 'index.html'
        || href === page
        || (page === 'work.html'    && href === 'work.html')
        || (page === 'pricing.html' && href === 'pricing.html')
        || (page === 'contact.html' && href === 'contact.html')
      ) {
        a.classList.add('active');
      }
    });
  }
  setActiveLink();

  /* ---- Scrolled class on navbar ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    function handleScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ---- Custom cursor ---- */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  if (cursor && cursorRing) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    const interactiveEls = 'a, button, .work-card, .price-card, .filter-btn, .ex-card, input, select, textarea, .faq-question';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(interactiveEls)) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(interactiveEls)) document.body.classList.remove('cursor-hover');
    });
  }

  /* ---- Reveal on scroll ---- */
  function revealCheck() {
    const threshold = window.innerHeight - 90;
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      if (el.getBoundingClientRect().top < threshold) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', revealCheck, { passive: true });
  setTimeout(revealCheck, 120);

  /* ---- Mobile menu toggle (hamburger if nav-links hidden) ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

})();

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

  /* ---- Hamburger / Mobile menu ---- */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on backdrop tap (outside menu links area)
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Reveal on scroll ---- */
  function revealCheck() {
    const threshold = window.innerHeight - 80;
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      if (el.getBoundingClientRect().top < threshold) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', revealCheck, { passive: true });
  setTimeout(revealCheck, 120);

})();
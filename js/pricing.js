/* =============================================
   pricing.js — Billing toggle + FAQ accordion
   ============================================= */

(function () {
  'use strict';

  /* ---- Billing toggle ---- */
  const toggle      = document.getElementById('billingToggle');
  const priceEls    = document.querySelectorAll('[data-monthly][data-annual]');

  function updatePrices(annual) {
    priceEls.forEach(el => {
      el.textContent = annual ? el.dataset.annual : el.dataset.monthly;
    });
    const badge = document.getElementById('saveBadge');
    if (badge) badge.style.opacity = annual ? '1' : '0.4';
  }

  if (toggle) {
    toggle.addEventListener('change', () => updatePrices(toggle.checked));
    updatePrices(false);
  }

  /* ---- FAQ accordion ---- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => i.classList.remove('open'));
      // Open clicked if it wasn't open
      if (!isOpen) item.classList.add('open');
    });
  });

})();

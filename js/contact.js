/* =============================================
   contact.js — Form submission (WhatsApp redirect)
   ============================================= */

(function () {
  'use strict';

  const form        = document.getElementById('enquiryForm');
  const successBox  = document.getElementById('formSuccess');
  const PHONE       = '6281234567890'; // ← CHANGE to your actual number

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = (form.querySelector('[name="name"]')?.value    || '').trim();
    const email   = (form.querySelector('[name="email"]')?.value   || '').trim();
    const service = (form.querySelector('[name="service"]')?.value || '').trim();
    const budget  = (form.querySelector('[name="budget"]')?.value  || '').trim();
    const message = (form.querySelector('[name="message"]')?.value || '').trim();

    const text = [
      `Hi websitestudio.id! 👋`,
      ``,
      `*Name:* ${name}`,
      email    ? `*Email:* ${email}` : '',
      service  ? `*Service needed:* ${service}` : '',
      budget   ? `*Budget range:* ${budget}` : '',
      message  ? `*Message:* ${message}` : '',
    ].filter(Boolean).join('\n');

    const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    // Show success
    form.style.display = 'none';
    if (successBox) successBox.classList.add('show');
  });

})();

/* =============================================
   work.js — Filter tabs + Video modal
   ============================================= */

(function () {
  'use strict';

  /* ---- Filter buttons ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards  = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      workCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
          requestAnimationFrame(() => card.style.opacity = '1');
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 220);
        }
      });
    });
  });

  /* ---- Modal ---- */
  const modal      = document.getElementById('workModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalType  = document.getElementById('modalType');
  const modalTagsEl= document.getElementById('modalTags');
  const modalVideoWrap = document.getElementById('modalVideoWrap');

  function openModal(card) {
    if (!modal) return;
    const name  = card.dataset.name     || 'Project';
    const type  = card.dataset.category || '';
    const tags  = (card.dataset.tags    || '').split(',').filter(Boolean);
    const video = card.dataset.video    || '';

    if (modalTitle)  modalTitle.textContent  = name;
    if (modalType)   modalType.textContent   = type;
    if (modalTagsEl) {
      modalTagsEl.innerHTML = tags.map(t => `<span class="modal-tag">${t.trim()}</span>`).join('');
    }
    if (modalVideoWrap) {
      if (video) {
        modalVideoWrap.innerHTML = `<video src="${video}" controls autoplay muted playsinline style="width:100%;height:100%;object-fit:contain;"></video>`;
      } else {
        modalVideoWrap.innerHTML = `
          <div class="modal-placeholder">
            <div class="big-icon">🎬</div>
            <p>Add your screen-recording video to this project.<br>
               Set <code>data-video="path/to/your.mp4"</code> on the card.</p>
          </div>`;
      }
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (modalVideoWrap) {
      const v = modalVideoWrap.querySelector('video');
      if (v) v.pause();
    }
  }

  workCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

})();

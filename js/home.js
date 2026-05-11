/* =============================================
   home.js — Hero particles + Frame sequence
   ============================================= */

(function () {
  'use strict';

  /* ============================================
     PARTICLE CANVAS
     ============================================ */
  const pc   = document.getElementById('particleCanvas');
  if (!pc) return;
  const pctx = pc.getContext('2d');

  function resizePC() {
    pc.width  = window.innerWidth;
    pc.height = window.innerHeight;
  }
  resizePC();
  window.addEventListener('resize', resizePC, { passive: true });

  const PARTICLE_COUNT = 90;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:     Math.random() * window.innerWidth,
    y:     Math.random() * window.innerHeight,
    r:     Math.random() * 1.5 + 0.3,
    vx:    (Math.random() - 0.5) * 0.28,
    vy:    (Math.random() - 0.5) * 0.28,
    alpha: Math.random() * 0.4 + 0.08,
  }));

  function animParticles() {
    pctx.clearRect(0, 0, pc.width, pc.height);
    particles.forEach(p => {
      p.x += p.vx;  p.y += p.vy;
      if (p.x < 0)        p.x = pc.width;
      if (p.x > pc.width) p.x = 0;
      if (p.y < 0)        p.y = pc.height;
      if (p.y > pc.height) p.y = 0;
      pctx.beginPath();
      pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pctx.fillStyle = `rgba(160,126,224,${p.alpha})`;
      pctx.fill();
    });
    requestAnimationFrame(animParticles);
  }
  animParticles();

  /* ============================================
     FRAME SEQUENCE  (240-frame scroll animation)
     ============================================
     HOW TO USE YOUR OWN IMAGES:
     1. Put your 240 frames in assets/images/seq/
        named: frame_001.jpg, frame_002.jpg … frame_240.jpg
     2. Uncomment the REAL IMAGES block below
        and comment out the PLACEHOLDER block.
     ============================================ */

  const fc   = document.getElementById('frameCanvas');
  if (!fc) return;
  const fctx = fc.getContext('2d');
  const TOTAL_FRAMES = 240;
  let currentFrame = -1;

  /* ---------- FRAME TEXT LABELS ---------- */
  const frameLabels = [
    { at: 0,   text: 'Crafting digital experiences' },
    { at: 60,  text: 'Built for blazing performance' },
    { at: 120, text: 'Designed to convert visitors' },
    { at: 180, text: 'Animated with precision' },
    { at: 220, text: 'Ready to launch 🚀' },
  ];
  const overlayText  = document.getElementById('frameOverlayText');
  const progressBar  = document.getElementById('frameProgress');

  /* ---------- PLACEHOLDER RENDERER ---------- */
  function drawPlaceholder(frame) {
    const w = fc.width, h = fc.height;
    const t = frame / TOTAL_FRAMES;

    // Background
    const bgR = Math.round(8  + t * 8);
    const bgG = Math.round(9  + t * 4);
    const bgB = Math.round(13 + t * 18);
    fctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
    fctx.fillRect(0, 0, w, h);

    // Grid
    fctx.strokeStyle = `rgba(124,92,191,${0.04 + t * 0.08})`;
    fctx.lineWidth = 1;
    for (let x = 0; x < w; x += 80) { fctx.beginPath(); fctx.moveTo(x,0); fctx.lineTo(x,h); fctx.stroke(); }
    for (let y = 0; y < h; y += 80) { fctx.beginPath(); fctx.moveTo(0,y); fctx.lineTo(w,y); fctx.stroke(); }

    // Animated glow orbs
    const a1 = (frame / TOTAL_FRAMES) * Math.PI * 5;
    const cx1 = w * 0.5 + Math.cos(a1 * 0.6) * w * 0.25;
    const cy1 = h * 0.5 + Math.sin(a1 * 0.4) * h * 0.2;
    const r1  = 120 + Math.sin(a1) * 60;
    const g1  = fctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1 * 2.5);
    g1.addColorStop(0, `rgba(124,92,191,${0.35 + t * 0.25})`);
    g1.addColorStop(1, 'transparent');
    fctx.beginPath(); fctx.arc(cx1, cy1, r1 * 2.5, 0, Math.PI * 2);
    fctx.fillStyle = g1; fctx.fill();

    const cx2 = w * 0.3 + Math.cos(a1 * 0.3 + 2) * w * 0.2;
    const cy2 = h * 0.6 + Math.sin(a1 * 0.5 + 1) * h * 0.15;
    const g2  = fctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, 90);
    g2.addColorStop(0, `rgba(160,126,224,${0.2 + t * 0.15})`);
    g2.addColorStop(1, 'transparent');
    fctx.beginPath(); fctx.arc(cx2, cy2, 90, 0, Math.PI * 2);
    fctx.fillStyle = g2; fctx.fill();

    // Helper text
    fctx.textAlign    = 'center';
    fctx.textBaseline = 'middle';
    fctx.font         = `bold ${Math.round(28 + t * 12)}px 'Syne', sans-serif`;
    fctx.fillStyle    = `rgba(240,238,255,${0.06 + t * 0.04})`;
    fctx.fillText(`Frame ${frame + 1} / ${TOTAL_FRAMES}`, w / 2, h / 2 - 16);
    fctx.font      = `14px 'DM Sans', sans-serif`;
    fctx.fillStyle = 'rgba(240,238,255,0.18)';
    fctx.fillText('[ Drop your 240-frame image sequence into assets/images/seq/ ]', w / 2, h / 2 + 22);
  }

  /* ---------- REAL IMAGES BLOCK (uncomment to use) ---------- */
  /*
  const frameImages = [];
  let framesLoaded = 0;
  const IMAGES_READY = new Promise(resolve => {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i + 1).padStart(3, '0');
      img.src = `assets/images/seq/frame_${num}.jpg`;
      img.onload = () => { framesLoaded++; if (framesLoaded === TOTAL_FRAMES) resolve(); };
      frameImages.push(img);
    }
  });
  function drawReal(frame) {
    fctx.drawImage(frameImages[frame], 0, 0, fc.width, fc.height);
  }
  */

  /* ---------- RENDER FRAME ---------- */
  function renderFrame(frame) {
    if (frame === currentFrame) return;
    currentFrame = frame;

    drawPlaceholder(frame);          // ← replace with drawReal(frame) when using real images

    // Update overlay text
    let label = frameLabels[0].text;
    frameLabels.forEach(fl => { if (frame >= fl.at) label = fl.text; });
    if (overlayText) {
      if (overlayText.textContent !== label) {
        overlayText.classList.remove('visible');
        setTimeout(() => {
          overlayText.textContent = label;
          overlayText.classList.add('visible');
        }, 280);
      }
    }
    // Progress bar
    if (progressBar) progressBar.style.width = ((frame / (TOTAL_FRAMES - 1)) * 100) + '%';
  }
  renderFrame(0);

  /* ---------- SCROLL DRIVE ---------- */
  const seqEl = document.getElementById('frame-sequence');
  if (seqEl) {
    function onScroll() {
      const rect     = seqEl.getBoundingClientRect();
      const progress = -rect.top / (seqEl.offsetHeight - window.innerHeight);
      const clamped  = Math.max(0, Math.min(1, progress));
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(clamped * TOTAL_FRAMES));
      renderFrame(frameIdx);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

})();

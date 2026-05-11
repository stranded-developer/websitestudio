/* =============================================
   home.js — Hero particles
   ============================================= */

(function () {
  'use strict';

  /* ============================================
     PARTICLE CANVAS
     ============================================ */
  const pc = document.getElementById('particleCanvas');
  if (!pc) return;
  const pctx = pc.getContext('2d');

  function resizePC() {
    pc.width  = window.innerWidth;
    pc.height = window.innerHeight;
  }
  resizePC();
  window.addEventListener('resize', resizePC, { passive: true });

  const PARTICLE_COUNT = 70;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:     Math.random() * window.innerWidth,
    y:     Math.random() * window.innerHeight,
    r:     Math.random() * 1.4 + 0.3,
    vx:    (Math.random() - 0.5) * 0.25,
    vy:    (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.4 + 0.06,
  }));

  function animParticles() {
    pctx.clearRect(0, 0, pc.width, pc.height);
    particles.forEach(p => {
      p.x += p.vx;  p.y += p.vy;
      if (p.x < 0)         p.x = pc.width;
      if (p.x > pc.width)  p.x = 0;
      if (p.y < 0)         p.y = pc.height;
      if (p.y > pc.height) p.y = 0;
      pctx.beginPath();
      pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pctx.fillStyle = `rgba(160,126,224,${p.alpha})`;
      pctx.fill();
    });
    requestAnimationFrame(animParticles);
  }
  animParticles();

})();
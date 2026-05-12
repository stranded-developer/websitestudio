import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../components/useReveal'
import { useLang } from '../components/LangContext.jsx'

const WA_NUMBER = '6281234567890'

const TESTIMONIALS = [
  { stars:'★★★★★', quote:'"Our website transformed how clients see us. Leads doubled within the first month of launch."', initials:'AR', name:'Adi Ramadhan', role:'CEO, PT Karya Maju' },
  { stars:'★★★★★', quote:'"Delivered in 5 days and it looked better than I ever imagined. The animations are stunning!"', initials:'SR', name:'Sari Rahayu', role:'Owner, Sari Boutique' },
  { stars:'★★★★★', quote:'"Professional and creative. They understood our brand from the first call. Highly recommend!"', initials:'BP', name:'Bima Pratama', role:'Founder, BuildFast Agency' },
  { stars:'★★★★★', quote:'"Investors were blown away by our site before we even started pitching. Best investment ever."', initials:'DW', name:'Dinda Wijaya', role:'Co-founder, Fintech ID' },
  { stars:'★★★★★', quote:'"The booking system saves us 3 hours per day. Every rupiah was worth it. Luar biasa!"', initials:'RN', name:'Rico Nugroho', role:'Owner, Warung Rico' },
  { stars:'★★★★★', quote:'"Design quality on par with agencies that charge 10× more. Brief to launch in one week flat."', initials:'LH', name:'Linda Halim', role:'Marketing Dir., Griya Property' },
]

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip animation for small numbers
    if (target <= 10) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          setCount(target)
        }
      }, { threshold: 0.3 })
      observer.observe(el)
      return () => observer.disconnect()
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTime = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1)
          // Stronger ease: stays near 0 longer, rushes at end
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * target))
          if (progress < 1) requestAnimationFrame(tick)
          else setCount(target)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

function StatItem({ num, suffix, label }) {
  const { count, ref } = useCountUp(num, num <= 10 ? 0 : 3500)
  const isSmall = num <= 10

  return (
    <div
      className="stat-item"
      ref={ref}
      style={isSmall ? { transition: 'opacity 0.8s ease', opacity: count === num ? 1 : 0 } : {}}
    >
      <div className="stat-num">
  {count}
  <em style={suffix.includes('★') ? { fontSize: '.55em', verticalAlign: 'middle', position: 'relative', bottom: '0.2em' } : undefined}>
    {suffix}
  </em>
</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}



const STATS = [
  { num: 1100, suffix: ' +' },
  { num: 98,   suffix: ' %' },
  { num: 9,    suffix: ' ×' },
  { num: 5,    suffix: ' ★' },
]

export default function Home() {
  useReveal()
  const { t } = useLang()
  const canvasRef = useRef(null)

  useEffect(() => {
    const pc = canvasRef.current
    if (!pc) return
    const pctx = pc.getContext('2d')
    let animId
    const resize = () => { pc.width = window.innerWidth; pc.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * pc.width, y: Math.random() * pc.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.06,
    }))
    const anim = () => {
      pctx.clearRect(0, 0, pc.width, pc.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = pc.width; if (p.x > pc.width) p.x = 0
        if (p.y < 0) p.y = pc.height; if (p.y > pc.height) p.y = 0
        pctx.beginPath(); pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        pctx.fillStyle = `rgba(160,126,224,${p.alpha})`; pctx.fill()
      })
      animId = requestAnimationFrame(anim)
    }
    anim()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  const testiItems = [...TESTIMONIALS, ...TESTIMONIALS]
  const marqueeItems = [...t.marqueeItems, ...t.marqueeItems]

  return (
    <>
      <style>{`
        #home { position:relative; min-height:100dvh; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden; }
        .hero-bg { position:absolute; inset:0; z-index:0; }
        #particleCanvas { position:absolute; inset:0; width:100%; height:100%; }
        .hero-orb { position:absolute; width:780px; height:780px; border-radius:50%; background:radial-gradient(circle,rgba(124,92,191,.2) 0%,transparent 68%); top:50%; left:50%; transform:translate(-50%,-62%); pointer-events:none; animation:orbPulse 7s ease-in-out infinite; }
        @keyframes orbPulse { 0%,100%{transform:translate(-50%,-62%) scale(1);opacity:.7} 50%{transform:translate(-50%,-62%) scale(1.1);opacity:1} }
        .mesh-overlay { position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(124,92,191,.07) 0%,transparent 70%); pointer-events:none; z-index:1; }
        .hero-content { position:relative; z-index:2; text-align:center; padding:0 1.5rem; max-width:880px; width:100%; }
        .hero-badge { display:inline-flex; align-items:center; gap:.5rem; background:rgba(124,92,191,.1); border:1px solid var(--border); border-radius:100px; padding:.38rem 1rem; font-size:.74rem; color:var(--purple-light); letter-spacing:.08em; text-transform:uppercase; margin-bottom:2rem; animation:fadeUp .8s ease .2s both; font-weight:600; }
        .hero-badge-dot { width:6px; height:6px; border-radius:50%; background:var(--purple-light); animation:blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
        h1.hero-title { font-family:'Outfit',sans-serif; font-size:clamp(2.4rem,6.5vw,5.8rem); font-weight:800; line-height:1.0; letter-spacing:-.04em; margin-bottom:1.5rem; animation:fadeUp .8s ease .4s both; }
        .hero-title .line { display:block; }
        .hero-title .outline { color:var(--purple-light); }
        .hero-sub { font-size:clamp(.95rem,1.8vw,1.1rem); color:var(--text2); max-width:520px; margin:0 auto 2.5rem; line-height:1.8; animation:fadeUp .8s ease .6s both; }
        .hero-actions { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; animation:fadeUp .8s ease .8s both; }
        .hero-stats { display:flex; gap:3rem; justify-content:center; margin-top:4rem; padding-top:2.5rem; border-top:1px solid var(--border2); animation:fadeUp .8s ease 1s both; flex-wrap:wrap; }
        .stat-item { text-align:center; }
        .stat-num { font-family:'Outfit',sans-serif; font-size:2.1rem; font-weight:800; line-height:1; letter-spacing:-.03em; }
        .stat-num em { color:var(--purple-light); font-style:normal; }
        .stat-label { font-size:.72rem; color:var(--text3); letter-spacing:.08em; text-transform:uppercase; margin-top:.3rem; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .scroll-hint { position:absolute; bottom:2rem; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:.5rem; animation:fadeUp 1s ease 1.6s both; }
        .scroll-hint span { font-size:.68rem; color:var(--text3); letter-spacing:.1em; text-transform:uppercase; }
        .scroll-line { width:1px; height:44px; background:linear-gradient(to bottom,var(--purple),transparent); animation:scrollAnim 2.2s ease-in-out infinite; }
        @keyframes scrollAnim { 0%{transform:scaleY(0);transform-origin:top} 49%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }
        .marquee-section { padding:3rem 0; border-top:1px solid var(--border2); border-bottom:1px solid var(--border2); overflow:hidden; }
        .marquee-track { display:flex; gap:3rem; width:max-content; animation:marquee 22s linear infinite; }
        .marquee-item { display:flex; align-items:center; gap:.8rem; white-space:nowrap; font-family:'Outfit',sans-serif; font-size:1.2rem; font-weight:700; color:var(--text3); letter-spacing:-.01em; }
        .marquee-dot { width:5px; height:5px; border-radius:50%; background:var(--purple); flex-shrink:0; }
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; }
        .about-title { font-family:'Outfit',sans-serif; font-size:clamp(1.8rem,3.5vw,2.9rem); font-weight:800; letter-spacing:-.03em; line-height:1.12; }
        .about-title .accent { color:var(--purple-light); }
        .about-body { display:flex; flex-direction:column; gap:1.4rem; }
        .about-body p { color:var(--text2); line-height:1.8; font-size:1rem; }
        .feature-pills { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:.5rem; }
        .pill { background:rgba(124,92,191,.1); border:1px solid var(--border); border-radius:100px; padding:.3rem .9rem; font-size:.76rem; color:var(--purple-light); letter-spacing:.03em; font-weight:500; }
        .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.2rem; margin-top:4rem; }
        .why-card { background:var(--surface); border:1px solid var(--border2); border-radius:16px; padding:1.8rem; transition:border-color .3s,transform .3s; }
        .why-card:hover { border-color:var(--border); transform:translateY(-4px); }
        .why-icon { font-size:1.7rem; margin-bottom:1rem; }
        .why-card h3 { font-family:'Outfit',sans-serif; font-size:1rem; font-weight:700; margin-bottom:.5rem; letter-spacing:-.01em; }
        .why-card p { font-size:.875rem; color:var(--text2); line-height:1.65; }
        .testi-card { background:var(--surface); border:1px solid var(--border2); border-radius:16px; padding:1.5rem; width:300px; flex-shrink:0; }
        .testi-stars { color:var(--purple-light); font-size:.75rem; letter-spacing:3px; margin-bottom:.8rem; }
        .testi-quote { font-size:.875rem; color:var(--text2); line-height:1.7; margin-bottom:1.2rem; font-style:italic; }
        .testi-author { display:flex; align-items:center; gap:.75rem; }
        .testi-avatar { width:34px; height:34px; border-radius:50%; background:var(--purple-glow); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-family:'Outfit',sans-serif; font-size:.75rem; font-weight:700; color:var(--purple-light); }
        .testi-name { font-size:.85rem; font-weight:500; }
        .testi-role { font-size:.75rem; color:var(--text3); }
        @media(max-width:900px){.about-grid{grid-template-columns:1fr;gap:2.5rem}.why-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:600px){.hero-stats{gap:1.5rem}.why-grid{grid-template-columns:1fr}.hero-actions{flex-direction:column;align-items:center}.hero-actions .btn-primary,.hero-actions .btn-ghost{width:100%;max-width:300px;justify-content:center}}
      `}</style>

      <section id="home">
        <div className="hero-bg">
          {/*<canvas ref={canvasRef} id="particleCanvas" />*/}
          <div className="hero-orb" />
        </div>
        <div className="mesh-overlay" />
        <div className="hero-content">
          <div className="hero-badge"><span className="hero-badge-dot" />{t.hero.badge}</div>
          <h1 className="hero-title">
            <span className="line">{t.hero.title1}</span>
            <span className="line outline">{t.hero.title2}</span>
          </h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-actions">
            <Link to="/work" className="btn-primary">{t.hero.cta1}</Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=Hi%20websitestudio.id!`} target="_blank" rel="noopener noreferrer" className="btn-ghost">{t.hero.cta2}</a>
          </div>
          <div className="hero-stats">
            {STATS.map((stat, i) => (
              <StatItem
                key={i}
                num={stat.num}
                suffix={stat.suffix}
                label={t.hero.stats[i][1]}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="marquee-section">
        <div className="marquee-track" aria-hidden="true">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item"><span className="marquee-dot" />{item}</span>
          ))}
        </div>
      </div>

      <section id="about">
        <div className="page-section">
          <div className="about-grid">
            <div className="reveal">
              <span className="section-label">{t.about.label}</span>
              <h2 className="about-title">{t.about.title1}<br /><span className="accent">{t.about.title2}</span></h2>
            </div>
            <div className="about-body reveal reveal-d1">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <div className="feature-pills">
                {t.about.pills.map(p => <span key={p} className="pill">{p}</span>)}
              </div>
            </div>
          </div>
          <div className="why-grid">
            {t.about.why.map((c, i) => (
              <div key={c.title} className={`why-card reveal reveal-d${(i % 3) + 1}`}>
                <div className="why-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" style={{ background:'var(--bg2)', padding:'5rem 0', overflow:'hidden' }}>
        <div className="page-section" style={{ paddingBottom:'2rem' }}>
          <span className="section-label" style={{ textAlign:'center', display:'block' }}>{t.testi.label}</span>
          <h2 className="section-title reveal" style={{ textAlign:'center' }}>{t.testi.title}</h2>
        </div>
        <div style={{ overflow:'hidden', padding:'1rem 0' }}>
          <div style={{ display:'flex', gap:'1.5rem', width:'max-content', animation:'marquee 32s linear infinite' }}>
            {testiItems.map((t2, i) => (
              <div key={i} className="testi-card">
                <div className="testi-stars">{t2.stars}</div>
                <p className="testi-quote">{t2.quote}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t2.initials}</div>
                  <div><div className="testi-name">{t2.name}</div><div className="testi-role">{t2.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 50% 50%,rgba(124,92,191,.1),transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:'600px', margin:'0 auto' }}>
          <span className="section-label reveal" style={{ display:'block', textAlign:'center' }}>{t.cta.label}</span>
          <h2 className="section-title reveal" style={{ fontSize:'clamp(1.8rem,5vw,3.5rem)' }}>{t.cta.title1} <span style={{ color:'var(--purple-light)' }}>{t.cta.title2}</span></h2>
          <p className="section-sub reveal" style={{ margin:'0 auto 2rem', textAlign:'center' }}>{t.cta.sub}</p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }} className="reveal reveal-d1">
            <Link to="/contact" className="btn-primary">{t.cta.btn1}</Link>
            <Link to="/pricing" className="btn-ghost">{t.cta.btn2}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
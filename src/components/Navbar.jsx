import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from './LangContext.jsx'

const WA_NUMBER = '6281234567890'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    ['/', t.nav.home],
    ['/work', t.nav.work],
    ['/pricing', t.nav.pricing],
    ['/contact', t.nav.contact],
  ]

  const mobileLinks = [
    ['/', t.nav.home],
    ['/#about', t.about.label],
    ['/#testimonials', t.testi.label],
    ['/work', t.nav.work],
    ['/pricing', t.nav.pricing],
    ['/contact', t.nav.contact],
  ]

  return (
    <>
      <style>{`
        /* Lang bar: sits at very top, extends INTO safe area (notch/Dynamic Island) */
        .lang-bar {
        isolation: isolate;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1100;
          /* Height = base 32px + safe area (notch height) */
          height: calc(32px + env(safe-area-inset-top));
          /* Push content DOWN below the notch */
          padding-top: env(safe-area-inset-top);
          padding-left: 2rem;
          padding-right: 2rem;
          background: #08090d;
          border-bottom: 1px solid var(--border2);
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          gap: .5rem;
          font-size: .72rem;
          color: var(--text3);
          letter-spacing: .06em;
          padding-bottom: 4px;
          box-sizing: border-box;
        }

        .lang-btn {
          background: none; border: none; cursor: pointer;
          font-size: .72rem; font-weight: 600; letter-spacing: .08em;
          padding: .2rem .5rem; border-radius: 4px;
          transition: color .2s, background .2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
          line-height: 1;
        }
        .lang-btn.active { color: var(--purple-light); background: var(--purple-glow2); }
        .lang-btn:not(.active) { color: var(--text3); }
        .lang-btn:not(.active):hover { color: var(--text2); }
        .lang-sep { color: var(--border2); line-height: 1; }

        /* Navbar sits directly below lang-bar */
        #navbar {
  position: fixed;
  top: calc(32px + env(safe-area-inset-top));
  left: 0;
  right: 0;
  height: 64px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  background: #08090d;
  border-bottom: 1px solid var(--border2);
  box-sizing: border-box;
}
        #navbar.scrolled { border-bottom-color: var(--border); }

        .desktop-nav { display: flex !important; }
        .desktop-only { display: inline-flex !important; }
        .hamburger-btn { display: none !important; }

        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .hamburger-btn { display: flex !important; }
          /* Keep padding-right/left for mobile, do NOT reset padding-top */
          .lang-bar { padding-left: 1.25rem; padding-right: 1.25rem; }
          #navbar { padding: 0 1.25rem; }
        }

        /* Mobile menu drops below both bars */
        .mobile-menu {
          position: fixed;
          top: calc(96px + env(safe-area-inset-top));
          left: 0; right: 0;
          z-index: 998;
          background: #08090d;
          border-bottom: 1px solid var(--border);
          padding: 1rem 1.5rem 2rem;
          display: none;
          flex-direction: column;
          gap: 0;
          max-height: calc(100dvh - 96px - env(safe-area-inset-top));
          overflow-y: auto;
          box-sizing: border-box;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border2);
          font-family: 'Outfit', sans-serif; font-size: 1.2rem; font-weight: 600;
          color: var(--text2); letter-spacing: -.01em;
          text-decoration: none; transition: color .2s;
        }
        .mobile-menu a:hover { color: var(--text); }

        /* Page sections: padding-top = lang-bar + navbar + safe area */
        #home {
  position: relative;

  min-height: calc(100dvh - 96px - env(safe-area-inset-top));

  margin-top: calc(96px + env(safe-area-inset-top));

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  overflow:hidden;

  isolation:isolate;

  background:#08090d;
}
        .work-header, .pricing-header, .contact-header {
          padding-top: calc(96px + env(safe-area-inset-top) + 4rem) !important;
        }
      `}</style>

      <div className="lang-bar">
        <span style={{ marginRight: 'auto' }}>Bahasa / Language</span>
        <span className="lang-sep">|</span>
        <button className={`lang-btn${lang === 'ID' ? ' active' : ''}`} onClick={() => setLang('ID')}>ID</button>
        <span className="lang-sep">/</span>
        <button className={`lang-btn${lang === 'EN' ? ' active' : ''}`} onClick={() => setLang('EN')}>EN</button>
      </div>

      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <Link to="/" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-.02em', zIndex: 1001, position: 'relative', textDecoration: 'none', color: 'var(--text)' }}>
          website<span style={{ color: 'var(--purple-light)' }}>studio</span>.id
        </Link>

        <ul className="desktop-nav" style={{ gap: 0, position: 'absolute', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,.04)', border: '1px solid var(--border2)', borderRadius: '100px', padding: '.25rem', listStyle: 'none' }}>
          {navLinks.map(([path, label]) => (
            <li key={path}>
              <Link to={path} style={{ display: 'block', padding: '.45rem 1.2rem', borderRadius: '100px', fontSize: '.8rem', fontWeight: 500, letterSpacing: '.03em', textTransform: 'uppercase', color: isActive(path) ? '#fff' : 'var(--text2)', background: isActive(path) ? 'var(--purple)' : 'transparent', transition: 'color .2s, background .2s', textDecoration: 'none' }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1001, position: 'relative' }}>
          <Link to="/contact" className="desktop-only" style={{ background: 'var(--purple)', color: '#fff', padding: '.5rem 1.2rem', borderRadius: '100px', fontSize: '.8rem', fontWeight: 500, transition: 'background .2s', textDecoration: 'none' }}>
            {t.nav.quote}
          </Link>
          <button onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen} className="hamburger-btn" style={{ flexDirection: 'column', justifyContent: 'center', gap: '5px', width: '36px', height: '36px', cursor: 'pointer', zIndex: 1010, position: 'relative', borderRadius: '8px', padding: '6px', border: '1px solid var(--border2)', background: 'var(--surface)' }}>
            <span style={{ display: 'block', height: '2px', background: 'var(--text)', borderRadius: '2px', width: '100%', transition: 'transform .25s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', height: '2px', background: 'var(--text)', borderRadius: '2px', width: '75%', transition: 'opacity .25s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', height: '2px', background: 'var(--text)', borderRadius: '2px', width: '100%', transition: 'transform .25s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {mobileLinks.map(([href, label]) => (
          <a key={label} href={href} onClick={() => { setMenuOpen(false); document.body.style.overflow = '' }}>
            {label} <span style={{ color: 'var(--purple-light)', fontSize: '1rem' }}>→</span>
          </a>
        ))}
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          <Link to="/contact" onClick={() => { setMenuOpen(false); document.body.style.overflow = '' }} style={{ display: 'block', textAlign: 'center', padding: '.9rem', borderRadius: '12px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '.95rem', fontWeight: 600, background: 'var(--purple)', color: '#fff', textDecoration: 'none' }}>
            {t.nav.quote}
          </Link>
          <a href={`https://wa.me/${WA_NUMBER}?text=Hi%20websitestudio.id!`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '.9rem', borderRadius: '12px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '.95rem', fontWeight: 600, background: 'var(--whatsapp)', color: '#fff', textDecoration: 'none' }}>
            💬 WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
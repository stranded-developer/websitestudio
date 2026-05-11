import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const WA_NUMBER = '6281234567890'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

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

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 'var(--nav-h)',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background .4s, border-bottom .4s, backdrop-filter .4s',
        background: scrolled || menuOpen ? 'rgba(8,9,13,.92)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}>
        {/* Logo */}
        <Link to="/" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-.02em', position: 'relative', zIndex: 1001 }}>
          website<span style={{ color: 'var(--purple-light)' }}>studio</span>.id
        </Link>

        {/* Desktop nav pill */}
        <ul style={{
          display: 'flex', gap: 0,
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,.04)',
          border: '1px solid var(--border2)',
          borderRadius: '100px', padding: '.25rem',
          listStyle: 'none',
        }} className="desktop-nav">
          {[['/', 'Home'], ['/work', 'Work'], ['/pricing', 'Pricing'], ['/contact', 'Contact']].map(([path, label]) => (
            <li key={path}>
              <Link to={path} style={{
                display: 'block', padding: '.45rem 1.2rem', borderRadius: '100px',
                fontSize: '.8rem', fontWeight: 500, letterSpacing: '.03em', textTransform: 'uppercase',
                color: isActive(path) ? '#fff' : 'var(--text2)',
                background: isActive(path) ? 'var(--purple)' : 'transparent',
                transition: 'color .2s, background .2s',
              }}>{label}</Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1001, position: 'relative' }}>
          <Link to="/contact" className="nav-cta desktop-only" style={{
            background: 'var(--purple)', color: '#fff', padding: '.5rem 1.2rem',
            borderRadius: '100px', fontSize: '.8rem', fontWeight: 500,
            transition: 'background .2s',
          }}>Get a Quote →</Link>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              display: 'none', flexDirection: 'column', justifyContent: 'center',
              gap: '5px', width: '36px', height: '36px', cursor: 'pointer',
              zIndex: 1010, position: 'relative', borderRadius: '8px', padding: '6px',
              border: '1px solid var(--border2)', background: 'var(--surface)',
            }}
            className="hamburger-btn"
          >
            <span style={{
              display: 'block', height: '2px', background: 'var(--text)', borderRadius: '2px',
              width: '100%', transition: 'transform .35s cubic-bezier(.23,1,.32,1), opacity .25s',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', height: '2px', background: 'var(--text)', borderRadius: '2px',
              width: '75%', transition: 'transform .35s, opacity .25s, width .25s',
              opacity: menuOpen ? 0 : 1, width: menuOpen ? '0' : '75%',
            }} />
            <span style={{
              display: 'block', height: '2px', background: 'var(--text)', borderRadius: '2px',
              width: '100%', transition: 'transform .35s cubic-bezier(.23,1,.32,1)',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        background: 'rgba(8,9,13,.97)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        borderBottom: '1px solid var(--border)',
        padding: 'calc(var(--nav-h) + 1rem) 2rem 2rem',
        display: 'flex', flexDirection: 'column', gap: 0,
        transform: menuOpen ? 'translateY(0)' : 'translateY(-110%)',
        transition: 'transform .4s cubic-bezier(.23,1,.32,1)',
      }} className="mobile-menu">
        {[
          ['/', 'Home'],
          ['/#about', 'About Us'],
          ['/#testimonials', 'Testimonials'],
          ['/work', 'Our Work'],
          ['/pricing', 'Pricing'],
          ['/contact', 'Contact Us'],
        ].map(([href, label]) => (
          <a key={label} href={href} onClick={() => { setMenuOpen(false); document.body.style.overflow = ''; }} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1.1rem 0',
            borderBottom: '1px solid var(--border2)',
            fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 600,
            color: 'var(--text2)', transition: 'color .2s, padding-left .2s', letterSpacing: '-.01em',
          }}>
            {label} <span style={{ color: 'var(--purple-light)', fontSize: '1.1rem' }}>→</span>
          </a>
        ))}
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          <Link to="/contact" onClick={() => { setMenuOpen(false); document.body.style.overflow = ''; }} style={{
            display: 'block', textAlign: 'center', padding: '.9rem', borderRadius: '12px',
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '.95rem', fontWeight: 600,
            background: 'var(--purple)', color: '#fff',
          }}>Get a Quote →</Link>
          <a href={`https://wa.me/${WA_NUMBER}?text=Hi%20websitestudio.id!`} target="_blank" rel="noopener noreferrer" style={{
            display: 'block', textAlign: 'center', padding: '.9rem', borderRadius: '12px',
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '.95rem', fontWeight: 600,
            background: 'var(--whatsapp)', color: '#fff',
          }}>💬 Chat on WhatsApp</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

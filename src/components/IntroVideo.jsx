// src/components/IntroVideo.jsx
import { useEffect, useRef, useState } from 'react'

export default function IntroVideo() {
  const [phase, setPhase] = useState('idle') // idle | fadein | playing | fadeout | done
  const videoRef = useRef(null)

  useEffect(() => {
    if (sessionStorage.getItem('introPlayed')) {
      setPhase('done')
      return
    }
    // Fade in
    setPhase('fadein')
    const t1 = setTimeout(() => setPhase('playing'), 600)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (phase === 'playing' && videoRef.current) {
      videoRef.current.play().catch(() => dismiss()) // autoplay blocked fallback
    }
  }, [phase])

  const dismiss = () => {
    setPhase('fadeout')
    if (videoRef.current) videoRef.current.pause()
    setTimeout(() => {
      setPhase('done')
      sessionStorage.setItem('introPlayed', '1')
    }, 800)
  }

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'fadein' ? 0 : phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.8s ease',
        pointerEvents: phase === 'fadeout' ? 'none' : 'all',
      }}
    >
      <video
        ref={videoRef}
        src="/intro.mp4"
        onEnded={dismiss}
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Skip button */}
      <button
        onClick={dismiss}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '.5rem',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '100px',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '.78rem',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          padding: '.5rem 1.1rem',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'background .2s, color .2s, border-color .2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
          e.currentTarget.style.color = '#fff'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
        }}
      >
        Skip
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"/>
          <line x1="19" y1="3" x2="19" y2="21"/>
        </svg>
      </button>
    </div>
  )
}
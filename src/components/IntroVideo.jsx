import { useEffect, useRef, useState } from 'react'

export default function IntroVideo() {
  const [phase, setPhase] = useState('gate') // gate | playing | fadeout | done
  const videoRef = useRef(null)

  useEffect(() => {
    if (sessionStorage.getItem('introPlayed')) {
      setPhase('done')
    }
  }, [])

  const start = () => {
    setPhase('playing')
    videoRef.current?.play()
  }

  const dismiss = () => {
    setPhase('fadeout')
    videoRef.current?.pause()
    setTimeout(() => {
      setPhase('done')
      sessionStorage.setItem('introPlayed', '1')
    }, 800)
  }

  if (phase === 'done') return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'fadeout' ? 0 : 1,
      transition: 'opacity 0.8s ease',
      pointerEvents: phase === 'fadeout' ? 'none' : 'all',
    }}>
      <video
        ref={videoRef}
        src="/intro.mp4"
        onEnded={dismiss}
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: phase === 'gate' ? 'none' : 'block' }}
      />

      {phase === 'gate' && (
  <button
    onClick={start}
    style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem',
      background: 'none', border: 'none', cursor: 'pointer', color: '#fff',
    }}
  >
    <style>{`
      @keyframes pulseRing {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.12); opacity: 0.6; }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
    `}</style>

    <div style={{
      width: '88px', height: '88px', borderRadius: '50%',
      border: '1.5px solid rgba(255,255,255,0.5)',
      background: 'rgba(255,255,255,0.12)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'pulseRing 1.8s ease-in-out infinite',
    }}>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </div>

    <span style={{
      fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.8)', fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
      animation: 'blink 1.8s ease-in-out infinite',
    }}>
      Tap to enter
    </span>
  </button>
)}

      {/* Skip button — only shown while playing */}
      {phase === 'playing' && (
        <button
          onClick={dismiss}
          style={{
            position: 'absolute', top: '2rem', right: '2rem',
            display: 'flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '100px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '.78rem', fontFamily: "'Outfit', sans-serif",
            letterSpacing: '.08em', textTransform: 'uppercase',
            padding: '.5rem 1.1rem', cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          Skip
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
            <line x1="19" y1="3" x2="19" y2="21"/>
          </svg>
        </button>
      )}
    </div>
  )
}
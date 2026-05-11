import { useEffect } from 'react'

export default function useReveal() {
  useEffect(() => {
    const check = () => {
      const threshold = window.innerHeight - 80
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        if (el.getBoundingClientRect().top < threshold) el.classList.add('visible')
      })
    }
    window.addEventListener('scroll', check, { passive: true })
    setTimeout(check, 120)
    return () => window.removeEventListener('scroll', check)
  }, [])
}

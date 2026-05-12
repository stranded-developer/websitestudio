import { useEffect } from 'react'

export default function useReveal() {
  useEffect(() => {
    const container = document.getElementById('scroll-container') ?? window
    const getThreshold = () => (container === window ? window.innerHeight : container.clientHeight) - 80

    const check = () => {
      const threshold = getThreshold()
      const containerTop = container === window ? 0 : container.getBoundingClientRect().top

      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const elTop = el.getBoundingClientRect().top - containerTop
        if (elTop < threshold) el.classList.add('visible')
      })
    }

    container.addEventListener('scroll', check, { passive: true })
    setTimeout(check, 120)
    return () => container.removeEventListener('scroll', check)
  }, [])
}
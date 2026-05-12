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

    // Reset all reveals then immediately re-check so visible ones snap back
    document.querySelectorAll('.reveal').forEach(el => el.classList.remove('visible'))
    setTimeout(check, 50)

    container.addEventListener('scroll', check, { passive: true })
    return () => container.removeEventListener('scroll', check)
  }) // <-- no dependency array = runs after every render including lang change
}
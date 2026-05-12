// src/components/ScrollToTop.jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const container = document.getElementById('scroll-container')
    if (container) {
      container.scrollTop = 0
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
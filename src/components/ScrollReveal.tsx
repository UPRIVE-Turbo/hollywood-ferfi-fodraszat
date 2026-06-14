'use client'

import { useEffect } from 'react'

export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.15 },
    )

    document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}

'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#szolgaltatasok', label: 'Szolgáltatások' },
  { href: '#rolunk', label: 'Rólunk' },
  { href: '#galeria', label: 'Galéria' },
  { href: '#kapcsolat', label: 'Kapcsolat' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full px-4 transition-all duration-500 md:px-12 ${
        scrolled
          ? 'border-b border-cream/10 bg-anthracite py-4 shadow-lg'
          : 'border-b border-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <a
          href="#"
          className="group relative z-50 flex flex-col leading-none font-heading text-2xl font-bold tracking-widest text-cream uppercase"
        >
          <span className="text-sm tracking-[0.2em] text-gold">Est. Miskolc</span>
          HOLLYWOOD
          <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
        </a>

        <nav className="hidden items-center gap-10 font-heading text-sm tracking-wider text-cream/80 uppercase lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors duration-300 hover:text-gold">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#idopont"
          className="hidden items-center justify-center border border-gold px-8 py-3 font-heading text-sm tracking-widest text-gold uppercase transition-all duration-300 hover:bg-gold hover:text-anthracite active:scale-[0.98] lg:inline-flex"
        >
          Időpontfoglalás
        </a>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-50 text-3xl text-gold lg:hidden"
          aria-label="Menü"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-anthracite transition-transform duration-500 ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-heading text-3xl tracking-widest text-cream uppercase hover:text-gold"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#idopont"
          onClick={() => setMenuOpen(false)}
          className="mt-8 bg-gold px-10 py-4 font-heading text-3xl font-bold tracking-widest text-anthracite uppercase"
        >
          Foglalás
        </a>
      </div>
    </header>
  )
}

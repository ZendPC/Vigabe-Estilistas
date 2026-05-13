import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import './Navbar.css'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Precios', href: '#precios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      // Detectar sección activa
      const sections = links.map(l => document.querySelector(l.href)).filter(Boolean)
      const scrollPos = window.scrollY + 120

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPos) {
          setActive(links[i].href)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
      <a href="#hero" className="navbar-logo" onClick={e => handleLink(e, '#hero')} aria-label="Vigabe Estilistas — Inicio">
        <img src="/images/logo.jpg" alt="" aria-hidden="true" />
        <span>Vigabe Estilistas</span>
      </a>

      <button
        className={`hamburger ${open ? 'active' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls="navbar-menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <ul id="navbar-menu" className={`navbar-links ${open ? 'open' : ''}`} role="menubar">
        {links.map(l => (
          <li key={l.href} role="none">
            <a
              href={l.href}
              onClick={e => handleLink(e, l.href)}
              className={active === l.href ? 'nav-active' : ''}
              role="menuitem"
              aria-current={active === l.href ? 'page' : undefined}
            >
              {l.label}
            </a>
          </li>
        ))}
        <li role="none">
          <a href="https://wa.link/wl9u2s" className="navbar-cta" target="_blank" rel="noopener noreferrer" aria-label="Reservar cita por WhatsApp">
            <FaWhatsapp size={15} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true" />
            Reservar cita
          </a>
        </li>
      </ul>
    </nav>
  )
}

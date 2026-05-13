import React from 'react'
import { MapPin, ArrowUp, Phone, MapPinned } from 'lucide-react'
import { FiInstagram } from 'react-icons/fi'
import './Footer.css'

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Precios', href: '#precios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/images/logo.jpg" alt="Vigabe Estilistas" />
            <h3>Vigabe Estilistas</h3>
            <p>Peluquería · Estética · BarberShop<br />Almería, España</p>
          </div>

          <div className="footer-links">
            <h4>Navegación</h4>
            <ul>
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href) }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contacto</h4>
            <p>
              <MapPin size={12} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              C. Alazán, 7, 04008 Almería
            </p>
            <p>
              <Phone size={12} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              <a href="tel:663738845">663 73 88 45</a>
            </p>
            <div className="footer-social">
              <a
                href="https://www.instagram.com/vigabeestilistas/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <FiInstagram size={13} /> Instagram
              </a>
              <a
                href="https://www.google.com/maps/place/Vigabe+Estilistas/@36.8484834,-2.4571615,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <MapPinned size={13} /> Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Vigabe Estilistas. Todos los derechos reservados.</p>
          <button className="scroll-top" onClick={scrollTop} aria-label="Volver arriba">
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}

import React from 'react'
import { Phone, ChevronDown, Scissors } from 'lucide-react'
import './Hero.css'

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-eyebrow">
          <Scissors size={14} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Peluquería · Estética · BarberShop
        </p>
        <h1 className="hero-title">
          Vigabe
          <span>Estilistas</span>
        </h1>
        <p className="hero-tagline">Tu imagen, nuestra pasión. Almería.</p>
        <div className="hero-actions">
          <a href="tel:663738845" className="btn-primary">
            <Phone size={15} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Reservar cita
          </a>
          <button className="btn-outline-white" onClick={() => scrollTo('#servicios')}>
            Ver servicios
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">+10</span>
            <span className="stat-label">Años de experiencia</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">4.8★</span>
            <span className="stat-label">Google Maps</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">705</span>
            <span className="stat-label">Seguidores Instagram</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll" onClick={() => scrollTo('#servicios')}>
        <ChevronDown size={28} color="rgba(255,255,255,0.6)" />
      </div>
    </section>
  )
}

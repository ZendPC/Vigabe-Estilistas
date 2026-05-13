import React, { useState } from 'react'
import { Search, X, ChevronLeft, ChevronRight, Tag, Sparkles } from 'lucide-react'
import './Pricing.css'

const priceCards = [
  {
    src: '/images/post_01.jpg',
    alt: 'Precios Alisado Keratina - Vigabe Estilistas',
    title: 'Alisado Keratina',
    items: [
      { label: 'Corto', price: 'desde 150€' },
      { label: 'Medio', price: 'desde 180€' },
      { label: 'Largo', price: 'desde 210€' },
    ],
  },
  {
    src: '/images/post_02.jpg',
    alt: 'Precios Tratamientos Capilares - Vigabe Estilistas',
    title: 'Tratamientos Capilares',
    items: [
      { label: 'Tratamiento Botox', price: '50€' },
      { label: 'Hidratación', price: '30€' },
    ],
  },
  {
    src: '/images/post_03.jpg',
    alt: 'Bono 9 Peinados - Vigabe Estilistas',
    title: 'Bono 9 Peinados',
    items: [
      { label: 'Bono 9 sesiones', price: '65€' },
    ],
  },
]

const priceList = [
  { service: 'Mechas raíz', price: 'Consultar' },
  { service: 'Mechas balayage', price: 'Consultar' },
  { service: 'Mechas babylight', price: 'Consultar' },
  { service: 'Tinte + mechas + matizador + corte + peinado + botox', price: 'desde 55€' },
  { service: 'Mechas chico', price: 'desde 15€' },
  { service: 'Tinte, corte y peinado', price: 'desde 35€' },
  { service: 'Tinte y peinado', price: 'desde 25€' },
  { service: 'Corte y peinado', price: 'desde 25€' },
  { service: 'Peinado, corte y tratamiento botox', price: 'desde 40€' },
  { service: 'Corte de señora', price: 'desde 13€' },
  { service: 'Corte de chico (degradado)', price: 'desde 10€' },
  { service: 'Corte y barba', price: 'desde 15€' },
  { service: 'Matizador, tratamiento de botox y peinado', price: 'desde 15€' },
  { service: 'Baño de color', price: 'desde 40€' },
  { service: 'Tinte', price: 'desde 15€' },
]

const offers = [
  { day: 'Martes', desc: 'Tinte + lavado + corte y peinado', price: '30€' },
  { day: 'Miércoles', desc: 'Tinte + lavado + marmoleado y peinado', price: '30€' },
  { day: 'Jueves', desc: 'Corte + lavado y peinado', price: '25€' },
]

export default function Pricing() {
  const [lightbox, setLightbox] = useState(null)

  const prev = (e) => {
    e.stopPropagation()
    setLightbox(l => (l - 1 + priceCards.length) % priceCards.length)
  }
  const next = (e) => {
    e.stopPropagation()
    setLightbox(l => (l + 1) % priceCards.length)
  }

  return (
    <section id="precios" className="pricing">
      <div className="container">
        <p className="section-subtitle">Tarifas</p>
        <h2 className="section-title">Precios</h2>
        <div className="black-line" />

        {/* Tarjetas de Instagram */}
        <div className="pricing-grid">
          {priceCards.map((card, i) => (
            <div className="pricing-card" key={i} onClick={() => setLightbox(i)}>
              <div className="pricing-img">
                <img src={card.src} alt={card.alt} loading="lazy" />
                <div className="pricing-overlay">
                  <Search size={20} strokeWidth={1.5} />
                </div>
              </div>
              <div className="pricing-info">
                <h3 className="pricing-title">
                  <Tag size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  {card.title}
                </h3>
                <ul className="pricing-items">
                  {card.items.map((item, j) => (
                    <li key={j}>
                      <span className="pricing-label">{item.label}</span>
                      <span className="pricing-price">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla de precios — estilo cartel del local */}
        <div className="price-table-section">
          <div className="price-table-card">
            <div className="price-table-header">
              <div className="price-table-brand">
                <img src="/images/logo.jpg" alt="Vigabe Estilistas" className="price-table-logo" />
                <div>
                  <span className="price-table-brand-name">Vigabe</span>
                  <span className="price-table-brand-sub">Estilistas</span>
                </div>
              </div>
              <div className="price-table-badge">
                Especializados<br />en Rubios
              </div>
            </div>
            <div className="price-table-wrapper">
              <table className="price-table">
                <tbody>
                  {priceList.map((row, i) => (
                    <tr key={i}>
                      <td className="price-service">{row.service}</td>
                      <td className="price-amount">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="price-table-footer">
              <span className="price-table-cta">TINTE DESDE 15€</span>
            </div>
          </div>
          <p className="pricing-note" style={{ marginTop: '1rem' }}>
            * Precios orientativos. Pueden variar según longitud y estado del cabello.
          </p>
        </div>

        {/* Ofertas semanales */}
        <div className="offers-section">
          <h3 className="offers-title">
            <Sparkles size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Ofertas Semanales
          </h3>
          <div className="offers-grid">
            {offers.map((offer, i) => (
              <div className="offer-card" key={i}>
                <div className="offer-day">{offer.day}</div>
                <p className="offer-desc">{offer.desc}</p>
                <div className="offer-price">{offer.price}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {lightbox !== null && (
        <div className="lightbox-pricing" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)} aria-label="Cerrar">
            <X size={22} />
          </button>
          <button className="lb-prev" onClick={prev} aria-label="Anterior">
            <ChevronLeft size={30} />
          </button>
          <img
            src={priceCards[lightbox].src}
            alt={priceCards[lightbox].alt}
            onClick={e => e.stopPropagation()}
          />
          <button className="lb-next" onClick={next} aria-label="Siguiente">
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </section>
  )
}

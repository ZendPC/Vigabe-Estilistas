import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import './Reviews.css'

const reviews = [
  {
    name: 'Carmen',
    rating: 5,
    date: 'Hace 2 años',
    text: 'Trato excelente, estilista que te recomienda lo que mejor va a ser para ti, atento a todo. Precios fantásticos, volveré y seguiré en sus manos! Victor hace magia!',
    avatar: 'C',
  },
  {
    name: 'Myriam Bonilla',
    rating: 5,
    date: 'Hace 11 meses',
    text: 'Me encanta la atención de Víctor, es súper amable y muy profesional. Además cuenta con una excelente instalación muy cómoda e impecable. Una peluquería para recomendar a ojos cerrados.',
    avatar: 'M',
  },
  {
    name: 'Cliente satisfecha',
    rating: 5,
    date: 'Hace 1 año',
    text: 'Me voy satisfecha con lo que me han hecho, así que, ¡VOLVERÉ!! Profesionalidad y buen trato van de la mano en este lugar, muy aconsejable.',
    avatar: 'A',
  },
  {
    name: 'Local Guide',
    rating: 5,
    date: 'Hace 6 meses',
    text: 'Profesionalidad y buen trato van de la mano en este lugar, muy aconsejable. El resultado fue exactamente lo que pedí.',
    avatar: 'L',
  },
]

function Stars({ n }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= n ? 'star filled' : 'star'}>★</span>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('next')

  const goTo = useCallback((idx, dir = 'next') => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setActive(idx)
      setAnimating(false)
    }, 350)
  }, [animating])

  const next = useCallback(() => {
    goTo((active + 1) % reviews.length, 'next')
  }, [active, goTo])

  const prev = useCallback(() => {
    goTo((active - 1 + reviews.length) % reviews.length, 'prev')
  }, [active, goTo])

  // Auto-play cada 5 segundos
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="resenas" className="reviews">
      <div className="container">
        <p className="section-subtitle">Lo que dicen</p>
        <h2 className="section-title">Reseñas de Clientes</h2>
        <div className="black-line" />

        <div className="reviews-score">
          <div className="score-big">4.8</div>
          <div className="score-info">
            <Stars n={5} />
            <p>84 reseñas en Google Maps</p>
          </div>
        </div>

        <div className="reviews-carousel">
          <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Reseña anterior">
            <ChevronLeft size={20} />
          </button>

          <div className={`review-card ${animating ? `slide-out-${direction}` : 'slide-in'}`}>
            <div className="review-header">
              <div className="review-avatar">{reviews[active].avatar}</div>
              <div>
                <strong className="review-name">{reviews[active].name}</strong>
                <span className="review-date">{reviews[active].date}</span>
              </div>
            </div>
            <Stars n={reviews[active].rating} />
            <p className="review-text">"{reviews[active].text}"</p>
          </div>

          <button className="carousel-btn carousel-next" onClick={next} aria-label="Siguiente reseña">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="review-dots">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`dot-btn ${i === active ? 'active' : ''}`}
              onClick={() => goTo(i, i > active ? 'next' : 'prev')}
              aria-label={`Reseña ${i + 1}`}
            />
          ))}
        </div>

        <div className="reviews-cta">
          <a
            href="https://www.google.com/maps/place/Vigabe+Estilistas/@36.8484834,-2.4571615,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <ExternalLink size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Ver todas las reseñas en Google
          </a>
        </div>
      </div>
    </section>
  )
}

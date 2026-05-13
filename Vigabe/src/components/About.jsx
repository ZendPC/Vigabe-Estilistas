import React from 'react'
import { Star, Award, MapPin, Phone, CheckCircle } from 'lucide-react'
import './About.css'

export default function About() {
  return (
    <section id="nosotros" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-images">
            <div className="about-img-main">
              <img src="/images/post_09.jpg" alt="Víctor, estilista de Vigabe" />
            </div>
            <div className="about-img-secondary">
              <img src="/images/post_06.jpg" alt="Interior Vigabe Estilistas" />
            </div>
          </div>
          <div className="about-text">
            <p className="section-subtitle" style={{ textAlign: 'left' }}>Quiénes somos</p>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Vigabe Estilistas</h2>
            <div className="black-line" style={{ margin: '1rem 0 2rem' }} />
            <p className="about-desc">
              Somos un salón de peluquería, estética y barbería ubicado en el corazón de Almería.
              Nuestro equipo, liderado por <strong>Víctor</strong>, combina técnica, creatividad y
              atención personalizada para que salgas sintiéndote único.
            </p>
            <p className="about-desc">
              Desde cortes y coloraciones hasta tratamientos capilares, alisados y ceremonias,
              ofrecemos un servicio completo en un ambiente cómodo e impecable.
            </p>
            <div className="about-features">
              <div className="feature">
                <CheckCircle size={18} className="feature-icon" />
                <div>
                  <strong>Atención personalizada</strong>
                  <p>Cada cliente recibe un trato único y profesional</p>
                </div>
              </div>
              <div className="feature">
                <Award size={18} className="feature-icon" />
                <div>
                  <strong>Productos de calidad</strong>
                  <p>Trabajamos con las mejores marcas del sector</p>
                </div>
              </div>
              <div className="feature">
                <Star size={18} className="feature-icon" />
                <div>
                  <strong>4.8★ en Google Maps</strong>
                  <p>84 reseñas de clientes satisfechos</p>
                </div>
              </div>
              <div className="feature">
                <MapPin size={18} className="feature-icon" />
                <div>
                  <strong>Almería centro</strong>
                  <p>C. Alazán, 7 — fácil acceso y aparcamiento cercano</p>
                </div>
              </div>
            </div>
            <a href="tel:663738845" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
              <Phone size={15} />
              Llámanos ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

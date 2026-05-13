import React, { useState } from 'react'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { FiInstagram } from 'react-icons/fi'
import './Gallery.css'

const images = [
  { src: '/images/post_04.jpg', alt: 'Corte de cabello Vigabe' },
  { src: '/images/post_05.jpg', alt: 'Tratamiento capilar Vigabe' },
  { src: '/images/post_06.jpg', alt: 'Resultado final Vigabe' },
  { src: '/images/post_07.jpg', alt: 'Estilismo Vigabe Almería' },
  { src: '/images/post_08.jpg', alt: 'Peluquería Vigabe Almería' },
  { src: '/images/post_09.jpg', alt: 'Barbería Vigabe' },
  { src: '/images/post_10.jpg', alt: 'Mechas Vigabe' },
  { src: '/images/post_11.jpg', alt: 'Alisado Vigabe' },
  { src: '/images/post_12.jpg', alt: 'Uñas Vigabe Estilistas' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const prev = (e) => { e.stopPropagation(); setLightbox(l => (l - 1 + images.length) % images.length) }
  const next = (e) => { e.stopPropagation(); setLightbox(l => (l + 1) % images.length) }

  return (
    <section id="galeria" className="gallery">
      <div className="container">
        <p className="section-subtitle">Nuestro trabajo</p>
        <h2 className="section-title">Galería</h2>
        <div className="black-line" />
        <div className="gallery-grid">
          {images.map((img, i) => (
            <div className="gallery-item" key={i} onClick={() => setLightbox(i)}>
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-overlay">
                <Search size={22} strokeWidth={1.5} />
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-instagram">
          <a
            href="https://www.instagram.com/vigabeestilistas/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
          >
            <FiInstagram size={16} />
            Síguenos en Instagram @vigabeestilistas
          </a>
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)} aria-label="Cerrar">
            <X size={22} />
          </button>
          <button className="lb-prev" onClick={prev} aria-label="Anterior">
            <ChevronLeft size={30} />
          </button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
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

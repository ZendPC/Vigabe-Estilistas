import React from 'react'
import { Scissors, Palette, Sparkles, Zap, Hand, Crown, Phone } from 'lucide-react'
import { GiRazor } from 'react-icons/gi'
import './Services.css'

const services = [
  {
    icon: <Scissors size={30} strokeWidth={1.5} />,
    title: 'Corte & Peinado',
    desc: 'Cortes personalizados para hombre, mujer y niño. Técnica profesional adaptada a tu estilo.',
    items: ['Corte de cabello', 'Peinado y brushing', 'Plancha y rizado'],
  },
  {
    icon: <Palette size={30} strokeWidth={1.5} />,
    title: 'Color & Mechas',
    desc: 'Coloraciones, mechas y técnicas de balayage para un resultado natural y luminoso.',
    items: ['Tinte completo', 'Mechas y balayage', 'Decoloración'],
  },
  {
    icon: <Sparkles size={30} strokeWidth={1.5} />,
    title: 'Tratamientos',
    desc: 'Alisados, botox capilar y tratamientos de nutrición para un cabello sano y brillante.',
    items: ['Alisado brasileño', 'Botox capilar', 'Keratina'],
  },
  {
    icon: <GiRazor size={30} />,
    title: 'BarberShop',
    desc: 'Servicio completo de barbería: corte, arreglo de barba y afeitado clásico.',
    items: ['Corte caballero', 'Arreglo de barba', 'Afeitado clásico'],
  },
  {
    icon: <Hand size={30} strokeWidth={1.5} />,
    title: 'Estética & Uñas',
    desc: 'Manicura, pedicura y tratamientos estéticos para un look completo de pies a cabeza.',
    items: ['Manicura', 'Pedicura', 'Uñas de gel'],
  },
  {
    icon: <Crown size={30} strokeWidth={1.5} />,
    title: 'Ceremonias',
    desc: 'Peinados y maquillaje para bodas, comuniones y eventos especiales. Tu gran día, perfecto.',
    items: ['Peinado de novia', 'Recogidos', 'Maquillaje'],
  },
]

export default function Services() {
  return (
    <section id="servicios" className="services">
      <div className="container">
        <p className="section-subtitle">Lo que ofrecemos</p>
        <h2 className="section-title">Nuestros Servicios</h2>
        <div className="black-line" />
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <ul className="service-items">
                {s.items.map((item, j) => (
                  <li key={j}>
                    <span className="dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="services-cta">
          <a href="tel:663738845" className="btn-primary">
            <Phone size={15} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Pedir cita — 663 73 88 45
          </a>
        </div>
      </div>
    </section>
  )
}

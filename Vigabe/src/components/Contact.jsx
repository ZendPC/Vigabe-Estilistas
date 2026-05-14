import React, { useState } from 'react'
import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react'
import { FiInstagram } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import './Contact.css'

const hours = [
  { day: 'Lunes',     time: 'Cerrado',       closed: true,  dayIndex: 1 },
  { day: 'Martes',    time: '10:00 – 21:00',  closed: false, dayIndex: 2 },
  { day: 'Miércoles', time: '10:00 – 21:00',  closed: false, dayIndex: 3 },
  { day: 'Jueves',    time: '10:00 – 21:00',  closed: false, dayIndex: 4 },
  { day: 'Viernes',   time: '10:00 – 21:00',  closed: false, dayIndex: 5 },
  { day: 'Sábado',    time: '10:00 – 14:00',  closed: false, dayIndex: 6 },
  { day: 'Domingo',   time: 'Cerrado',        closed: true,  dayIndex: 0 },
]

const locations = [
  {
    name: 'Almería — C. Alazán',
    address: 'C. Alazán, 7\n04008 Almería',
    mapsUrl: 'https://www.google.com/maps/place/Vigabe+Estilistas/@36.8484834,-2.4571615,17z',
    embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.5!2d-2.4571615!3d36.8484834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7a9f1ad7073249%3A0xd7c725702eeac152!2sVigabe%20Estilistas!5e0!3m2!1ses!2ses!4v1',
  },
  {
    name: 'Cabo de Gata',
    address: 'C. Iglesia de Cabo de Gata, 47\n04150 Cabo de Gata, Almería',
    mapsUrl: 'https://www.google.es/maps/place/C.+Iglesia+de+Cabo+de+Gata,+47,+04150+Cabo+de+Gata',
    embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.5!2d-2.2426033!3d36.7808056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7a91ea9725c987%3A0xf774d58bf47d5715!2sC.%20Iglesia%20de%20Cabo%20de%20Gata%2C%2047!5e0!3m2!1ses!2ses!4v1',
  },
]

const todayIndex = new Date().getDay()

function isOpenNow(h) {
  if (h.closed) return false
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  if (h.dayIndex === 6) return currentMinutes >= 600 && currentMinutes < 840
  return currentMinutes >= 600 && currentMinutes < 1260
}

export default function Contact() {
  const [activeLocation, setActiveLocation] = useState(0)

  return (
    <section id="contacto" className="contact">
      <div className="container">
        <p className="section-subtitle">Encuéntranos</p>
        <h2 className="section-title">Contacto & Horarios</h2>
        <div className="black-line" />

        {/* Selector de ubicación */}
        <div className="location-tabs" role="tablist" aria-label="Seleccionar ubicación">
          {locations.map((loc, i) => (
            <button
              key={i}
              className={`location-tab ${activeLocation === i ? 'active' : ''}`}
              onClick={() => setActiveLocation(i)}
              role="tab"
              aria-selected={activeLocation === i}
              aria-controls={`location-panel-${i}`}
            >
              <MapPin size={13} aria-hidden="true" />
              {loc.name}
            </button>
          ))}
        </div>

        <div className="contact-grid">
          <div className="contact-info">

            <div className="contact-block">
              <h3><MapPin size={13} aria-hidden="true" /> Dirección</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{locations[activeLocation].address}</p>
              <a
                href={locations[activeLocation].mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
                aria-label={`Ver ${locations[activeLocation].name} en Google Maps (abre en nueva pestaña)`}
              >
                Ver en Google Maps <ChevronRight size={12} style={{ verticalAlign: 'middle' }} aria-hidden="true" />
              </a>
            </div>

            <div className="contact-block">
              <h3><Phone size={13} aria-hidden="true" /> Teléfono</h3>
              <a href="tel:663738845" className="phone-link" aria-label="Llamar al 663 73 88 45">663 73 88 45</a>
              <p className="phone-note">Llama para reservar tu cita</p>
            </div>

            <div className="contact-block">
              <h3><FiInstagram size={13} aria-hidden="true" /> Instagram</h3>
              <a
                href="https://www.instagram.com/vigabeestilistas/"
                target="_blank"
                rel="noopener noreferrer"
                className="insta-link"
                aria-label="Seguir a Vigabe Estilistas en Instagram (abre en nueva pestaña)"
              >
                <FiInstagram size={15} aria-hidden="true" />
                @vigabeestilistas
              </a>
            </div>

            <div className="contact-block">
              <h3><Clock size={13} aria-hidden="true" /> Horario</h3>
              <table className="hours-table" aria-label="Horario de apertura">
                <tbody>
                  {hours.map((h, i) => {
                    const isToday = h.dayIndex === todayIndex
                    const openNow = isToday && isOpenNow(h)
                    const closedNow = isToday && !isOpenNow(h)
                    return (
                      <tr
                        key={i}
                        className={`${h.closed ? 'closed' : ''} ${isToday ? 'today' : ''}`}
                        aria-current={isToday ? 'true' : undefined}
                      >
                        <td>
                          {h.day} {isToday && <span style={{ fontSize: '0.85em', opacity: 0.8 }}>(HOY)</span>}
                          {isToday && (
                            <span
                              className={`today-badge${closedNow ? ' closed' : ''}`}
                              aria-label={openNow ? 'Abierto ahora' : 'Cerrado ahora'}
                            >
                              {openNow ? ' Abierto' : ' Cerrado'}
                            </span>
                          )}
                        </td>
                        <td>{h.time}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

          </div>

          <div className="contact-map" id={`location-panel-${activeLocation}`} role="tabpanel">
            <iframe
              key={activeLocation}
              title={`Ubicación de Vigabe Estilistas — ${locations[activeLocation].name}`}
              src={locations[activeLocation].embedSrc}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="contact-cta">
          <a href="https://wa.link/wl9u2s" className="btn-primary" target="_blank" rel="noopener noreferrer" aria-label="Reservar cita por WhatsApp">
            <FaWhatsapp size={17} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} aria-hidden="true" />
            Reservar cita por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

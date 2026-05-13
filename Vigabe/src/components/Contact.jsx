import React from 'react'
import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react'
import { FiInstagram } from 'react-icons/fi'
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

const todayIndex = new Date().getDay() // 0=Dom, 1=Lun...

// Determinar si está abierto ahora mismo
function isOpenNow(h) {
  if (h.closed) return false
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  if (h.dayIndex === 6) {
    // Sábado: 10:00–14:00
    return currentMinutes >= 600 && currentMinutes < 840
  }
  // Martes–Viernes: 10:00–21:00
  return currentMinutes >= 600 && currentMinutes < 1260
}

export default function Contact() {
  return (
    <section id="contacto" className="contact">
      <div className="container">
        <p className="section-subtitle">Encuéntranos</p>
        <h2 className="section-title">Contacto & Horarios</h2>
        <div className="black-line" />

        <div className="contact-grid">
          <div className="contact-info">

            <div className="contact-block">
              <h3><MapPin size={13} aria-hidden="true" /> Dirección</h3>
              <p>C. Alazán, 7<br />04008 Almería, España</p>
              <a
                href="https://www.google.com/maps/place/Vigabe+Estilistas/@36.8484834,-2.4571615,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
                aria-label="Ver Vigabe Estilistas en Google Maps (abre en nueva pestaña)"
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
                          {h.day}
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

          <div className="contact-map">
            <iframe
              title="Ubicación de Vigabe Estilistas en Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.5!2d-2.4571615!3d36.8484834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7a9f1ad7073249%3A0xd7c725702eeac152!2sVigabe%20Estilistas!5e0!3m2!1ses!2ses!4v1"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="contact-cta">
          <a href="tel:663738845" className="btn-primary" aria-label="Llamar para reservar cita ahora">
            <Phone size={15} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} aria-hidden="true" />
            Reservar cita ahora
          </a>
        </div>
      </div>
    </section>
  )
}

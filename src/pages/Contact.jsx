import { useState } from 'react'
import { Mail, Phone, ExternalLink, MapPin } from 'lucide-react'
import { CheckCircleIcon } from '../components/Icons'
import styles from './Contact.module.css'

const INITIAL = {
  name: '', email: '', phone: '', event: '', date: '', guests: '', message: '',
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required.'
    if (!form.event) e.event = 'Please select an event type.'
    if (!form.message.trim()) e.message = 'Tell us a little about your event.'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <p className="section-label">Let's Connect</p>
          <h1 className={styles.heroTitle}>Plan Your Perfect Graze</h1>
          <p className={styles.heroSub}>
            Ready to bring island flavors to your event? We'd love to hear from you.
            Fill out the form and we'll be in touch within 24 hours.
          </p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Contact Info */}
            <aside className={styles.info}>
              <h2 className={styles.infoTitle}>Get in Touch</h2>
              <p className={styles.infoDesc}>
                Whether you're planning a wedding, a corporate event, or a birthday brunch,
                we're here to make it extraordinary.
              </p>

              <div className={styles.infoItems}>
                <InfoItem icon={<Mail size={18} strokeWidth={1.75} />} label="Email Us" value="hello@islandgraze.com" href="mailto:hello@islandgraze.com" />
                <InfoItem icon={<Phone size={18} strokeWidth={1.75} />} label="Call Us" value="+1 (813)-750-6990" href="tel:+18137506990" />
                <InfoItem icon={<ExternalLink size={18} strokeWidth={1.75} />} label="Instagram" value="@island_graze" href="https://www.instagram.com/island_graze" external />
                <InfoItem icon={<MapPin size={18} strokeWidth={1.75} />} label="We Serve" value="Tampa, FL & Jamaica" />
              </div>

              <div className={styles.locations}>
                <h4 className={styles.locationsTitle}>Our Locations</h4>
                <div className={styles.locationCards}>
                  <div className={styles.locationCard}>
                    <span className={styles.locationCode}>JM</span>
                    <div>
                      <strong>Jamaica</strong>
                      <span>Kingston & Montego Bay</span>
                    </div>
                  </div>
                  <div className={styles.locationCard}>
                    <span className={styles.locationCode}>US</span>
                    <div>
                      <strong>Tampa, Florida</strong>
                      <span>Greater Tampa Bay Area</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.hours}>
                <h4 className={styles.locationsTitle}>Availability</h4>
                <p className={styles.hoursText}>
                  <em>Available for events 7 days a week — contact us to check availability.</em>
                </p>
              </div>
            </aside>

            {/* Form */}
            <div className={styles.formWrap}>
              {submitted ? (
                <SuccessMessage onReset={() => { setForm(INITIAL); setSubmitted(false) }} />
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <h3 className={styles.formTitle}>Book Your Experience</h3>

                  <div className={styles.row}>
                    <Field label="Full Name *" error={errors.name}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        className={errors.name ? styles.inputError : ''}
                      />
                    </Field>
                    <Field label="Email Address *" error={errors.email}>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className={errors.email ? styles.inputError : ''}
                      />
                    </Field>
                  </div>

                  <div className={styles.row}>
                    <Field label="Phone Number" error={errors.phone}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (813) 555-0000"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </Field>
                    <Field label="Event Date" error={errors.date}>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                      />
                    </Field>
                  </div>

                  <div className={styles.row}>
                    <Field label="Event Type *" error={errors.event}>
                      <select
                        name="event"
                        value={form.event}
                        onChange={handleChange}
                        className={errors.event ? styles.inputError : ''}
                      >
                        <option value="">Select an event type</option>
                        {['Wedding', 'Corporate Event', 'Private Party', 'Cocktail Hour', 'Anniversary', 'Graduation', 'Holiday Event', 'Other'].map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Expected Guests" error={errors.guests}>
                      <select name="guests" value={form.guests} onChange={handleChange}>
                        <option value="">Approximate guest count</option>
                        {['1–15', '15–30', '30–60', '60–100', '100–150', '150+'].map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Tell Us About Your Event *" error={errors.message}>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Share details about your vision, location, preferred service, any dietary restrictions, or special requests..."
                      value={form.message}
                      onChange={handleChange}
                      className={errors.message ? styles.inputError : ''}
                    />
                  </Field>

                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                    Send Inquiry
                  </button>
                  <p className={styles.formNote}>We respond within 24 hours. No spam, ever.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function InfoItem({ icon, label, value, href, external }) {
  return (
    <div className={styles.infoItem}>
      <span className={styles.infoIcon}>{icon}</span>
      <div className={styles.infoText}>
        <span className={styles.infoLabel}>{label}</span>
        {href ? (
          <a
            href={href}
            className={styles.infoValue}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {value}
          </a>
        ) : (
          <span className={styles.infoValue}>{value}</span>
        )}
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

function SuccessMessage({ onReset }) {
  return (
    <div className={styles.success}>
      <div className={styles.successIcon}>
        <CheckCircleIcon size={56} />
      </div>
      <h3 className={styles.successTitle}>Your inquiry has been sent!</h3>
      <p className={styles.successDesc}>
        Thank you for reaching out to Island Graze. We're excited to hear about your
        event and will be in touch within 24 hours.
      </p>
      <button onClick={onReset} className="btn btn-primary">Send Another Inquiry</button>
    </div>
  )
}

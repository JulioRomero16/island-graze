import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircleIcon } from '../components/Icons'
import styles from './Services.module.css'

export default function Services() {
  return (
    <>
      <PageHero />
      <FloridaSection />
      <JamaicaSection />
      <ProcessSection />
    </>
  )
}

/* ─── Page Hero ─────────────────────────────────────────── */
function PageHero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
        <p className="section-label">Jamaica & Tampa, Florida</p>
        <h1 className={styles.heroTitle}>Our Services</h1>
        <p className={styles.heroSub}>
          Two locations, one commitment — bringing artisan grazing experiences
          crafted with Caribbean heart to every table we touch.
        </p>
        <div className={styles.heroLocations}>
          <span className={styles.heroLoc}>Tampa, Florida</span>
          <span className={styles.heroDivider}>·</span>
          <span className={styles.heroLoc}>Jamaica</span>
        </div>
      </div>
    </section>
  )
}

/* ─── Florida Section ───────────────────────────────────── */
const FL_SERVICES = [
  {
    title: 'Grazing Carts',
    photo: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80&auto=format&fit=crop',
    photoAlt: 'Elegant grazing cart at an event',
    desc: 'A beautifully styled mobile cart that brings the grazing experience directly to your guests. Adorned with tropical greenery and blooms, our carts are a moving centerpiece — perfect for cocktail hours, gallery openings, and milestone celebrations.',
    includes: [
      'Fully styled cart with tropical botanicals',
      'Rotating selection of cheeses & charcuterie',
      'Fresh fruit skewers & bite-sized bites',
      'Dipping sauces & artisan accompaniments',
      'Fully customizable theme',
      'Setup and breakdown included',
    ],
  },
  {
    title: 'Cocktail Hour Appetizers',
    photo: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80&auto=format&fit=crop',
    photoAlt: 'Elegant cocktail hour food spread',
    desc: 'Elevate your cocktail hour with elegant passed bites and curated grazing stations. From bruschetta boards to mini charcuterie cones, we design offerings that pair beautifully with your beverage program and keep guests mingling.',
    includes: [
      'Passed bite-sized appetizers',
      'Mini charcuterie cones & cups',
      'Seasonal crostini & bruschetta selections',
      'Fresh fruit & vegetable displays',
      'Artisan dips & spreads',
      'Styled presentation with florals',
    ],
  },
  {
    title: 'Customizable Boards',
    photo: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=800&q=80&auto=format&fit=crop',
    photoAlt: 'Beautiful charcuterie board close-up',
    desc: 'From solo date-night boards to party-sized spreads, every board is handcrafted to your vision. Choose your theme, dietary preferences, and flavor profile — we handle the rest with artisan precision and island flair.',
    includes: [
      'Custom theme & color palette styling',
      'Artisan cheese & charcuterie selections',
      'Seasonal fruits, nuts & honeycomb',
      'House-made jams & preserves',
      'Artisan crackers, crostini & breads',
      'Delivery & setup available in Tampa Bay',
    ],
  },
]

function FloridaSection() {
  return (
    <section className={styles.floridaSection}>
      {/* Location banner */}
      <div className={styles.locationBanner}>
        <div className="container">
          <div className={styles.locationBannerInner}>
            <div className={styles.locationCodeBadge}>US</div>
            <div>
              <h2 className={styles.locationTitle}>Tampa, Florida</h2>
              <p className={styles.locationSubtitle}>Serving the Greater Tampa Bay Area</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.sectionIntro}>
          <p className="section-label">Florida Offerings</p>
          <h2 className="section-title">Elegant grazing for Tampa Bay events</h2>
          <p className="section-subtitle">
            Whether you're hosting an intimate gathering or a grand celebration,
            our Tampa Bay offerings bring island-inspired artistry to your event.
          </p>
        </div>

        <div className={styles.flCards}>
          {FL_SERVICES.map(s => (
            <div key={s.title} className={styles.flCard}>
              <div className={styles.flCardPhoto}>
                <img src={s.photo} alt={s.photoAlt} loading="lazy" />
              </div>
              <h3 className={styles.flCardTitle}>{s.title}</h3>
              <p className={styles.flCardDesc}>{s.desc}</p>
              <div className={styles.includesList}>
                <p className={styles.includesLabel}>What's Included</p>
                <ul>
                  {s.includes.map(item => (
                    <li key={item}><span className={styles.check}>+</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.flCta}>
          <p className={styles.flCtaNote}>
            All offerings are fully customizable. Reach out to discuss your event and we'll
            craft the perfect experience for you.
          </p>
          <Link to="/contact" className="btn btn-primary">Request a Quote</Link>
        </div>
      </div>
    </section>
  )
}

/* ─── Jamaica Section ───────────────────────────────────── */
const JM_OCCASIONS = [
  'Weddings',
  'Corporate Events',
  'Private Parties',
  'Graduations',
  'Anniversaries',
  'Holiday Events',
  'Beach Celebrations',
  'Evening Galas',
  'Birthdays',
  'Networking Events',
  'Garden Parties',
  'Destination Events',
]

const INITIAL_FORM = { name: '', email: '', eventType: '', location: '', guests: '', message: '' }

function JamaicaSection() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.eventType) e.eventType = 'Required'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  return (
    <section className={styles.jamaicaSection}>
      {/* Location banner */}
      <div className={styles.locationBannerJm}>
        <div className="container">
          <div className={styles.locationBannerInner}>
            <div className={styles.locationCodeBadge}>JM</div>
            <div>
              <h2 className={styles.locationTitleLight}>Jamaica</h2>
              <p className={styles.locationSubtitleLight}>Kingston, Montego Bay & island-wide</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.jmGrid}>
          {/* Left: Info */}
          <div className={styles.jmInfo}>
            <p className="section-label">Full-Service Catering</p>
            <h2 className={styles.jmTitle}>Complete catering for every occasion</h2>
            <p className={styles.jmDesc}>
              In Jamaica, Island Graze offers a comprehensive catering experience that goes
              beyond grazing. From intimate private dinners to large-scale weddings and corporate
              events, we design bespoke food experiences that reflect the richness of Caribbean
              culture and the artistry of fine dining.
            </p>
            <p className={styles.jmDesc}>
              Our Jamaica team handles every detail — from concept and menu planning through
              to setup, service, and breakdown — so you can be fully present for your event.
              Every experience is tailored to your guest count, venue, and vision.
            </p>

            <div className={styles.jmOccasions}>
              <p className={styles.includesLabel} style={{ marginBottom: '16px' }}>We Cater To</p>
              <div className={styles.occasionsGrid}>
                {JM_OCCASIONS.map(label => (
                  <div key={label} className={styles.occasion}>
                    <span className={styles.occasionLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className={styles.jmFormWrap}>
            <div className={styles.jmForm}>
              {submitted ? (
                <div className={styles.formSuccess}>
                  <span className={styles.successIcon}>
                    <CheckCircleIcon size={52} />
                  </span>
                  <h3 className={styles.successTitle}>Inquiry sent!</h3>
                  <p className={styles.successDesc}>
                    Thank you — we'll be in touch within 24 hours to discuss your event.
                  </p>
                  <button
                    onClick={() => { setForm(INITIAL_FORM); setSubmitted(false) }}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className={styles.jmFormTitle}>Get a Custom Quote</h3>
                  <p className={styles.jmFormSubtitle}>Tell us about your event and we'll be in touch.</p>

                  <div className={styles.formRow}>
                    <JmField label="Your Name *" error={errors.name}>
                      <input
                        type="text" name="name" placeholder="Full name"
                        value={form.name} onChange={handleChange}
                        className={errors.name ? styles.inputErr : ''}
                      />
                    </JmField>
                    <JmField label="Email Address *" error={errors.email}>
                      <input
                        type="email" name="email" placeholder="your@email.com"
                        value={form.email} onChange={handleChange}
                        className={errors.email ? styles.inputErr : ''}
                      />
                    </JmField>
                  </div>

                  <div className={styles.formRow}>
                    <JmField label="Event Type *" error={errors.eventType}>
                      <select
                        name="eventType" value={form.eventType} onChange={handleChange}
                        className={errors.eventType ? styles.inputErr : ''}
                      >
                        <option value="">Select event type</option>
                        {['Wedding', 'Corporate Event', 'Private Party', 'Graduation',
                          'Anniversary', 'Holiday Event', 'Birthday', 'Gala / Formal Event', 'Other'].map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </JmField>
                    <JmField label="Expected Guests">
                      <select name="guests" value={form.guests} onChange={handleChange}>
                        <option value="">Approximate count</option>
                        {['Under 25', '25–50', '50–100', '100–200', '200–400', '400+'].map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </JmField>
                  </div>

                  <JmField label="Event Location">
                    <input
                      type="text" name="location" placeholder="City / venue (e.g. Kingston, Montego Bay)"
                      value={form.location} onChange={handleChange}
                    />
                  </JmField>

                  <JmField label="Tell Us About Your Event *" error={errors.message}>
                    <textarea
                      name="message" rows={4}
                      placeholder="Share your vision, date, and any special requirements..."
                      value={form.message} onChange={handleChange}
                      className={errors.message ? styles.inputErr : ''}
                    />
                  </JmField>

                  <button type="submit" className={`btn btn-primary ${styles.jmSubmit}`}>
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function JmField({ label, error, children }) {
  return (
    <div className={styles.jmField}>
      <label className={styles.jmLabel}>{label}</label>
      {children}
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  )
}

/* ─── Process Section ───────────────────────────────────── */
function ProcessSection() {
  const steps = [
    { num: '01', title: 'Reach Out', desc: 'Fill out a quote request or send us a message with your event details.' },
    { num: '02', title: 'Design Together', desc: "We'll discuss your vision, dietary needs, guest count, and style." },
    { num: '03', title: 'We Create', desc: 'Our team sources the finest ingredients and crafts your experience.' },
    { num: '04', title: 'You Enjoy', desc: 'We deliver, set up, and style everything — you just enjoy the moment.' },
  ]
  return (
    <section className={styles.process}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="section-label">How It Works</p>
          <h2 className="section-title" style={{ color: 'var(--cream)' }}>From inquiry to island magic</h2>
        </div>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={s.num} className={styles.step}>
              <div className={styles.stepNum}>{s.num}</div>
              {i < steps.length - 1 && <div className={styles.stepLine} />}
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

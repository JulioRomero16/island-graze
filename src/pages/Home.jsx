import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedSection />
      <CtaSection />
    </>
  )
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />
      <div className={`container ${styles.heroContent}`}>
        <p className="section-label">Jamaica & Tampa, Florida</p>
        <h1 className={styles.heroTitle}>
          Bringing the taste of<br />
          <em>the islands</em> to your table.
        </h1>
        <p className={styles.heroSub}>
          Artisan charcuterie boards, grazing carts, and showstopping grazing
          tables crafted with Caribbean flair for your most memorable moments.
        </p>
        <div className={styles.heroBtns}>
          <Link to="/services" className="btn btn-primary">Explore Services</Link>
          <Link to="/contact" className="btn btn-outline">Book Your Event</Link>
        </div>
        <div className={styles.heroStats}>
          {[['2', 'Locations'], ['100%', 'Custom'], ['Caribbean', 'Inspired']].map(([num, label]) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statNum}>{num}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.heroScroll}>
        <div className={styles.scrollDot} />
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className={styles.about}>
      <div className="container">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImg}>
            <div className={styles.imgFrame}>
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop"
                alt="Elegant charcuterie and grazing spread"
                loading="lazy"
              />
            </div>
            <div className={styles.imgBadge}>
              <span className={styles.badgeEst}>Est.</span>
              <span className={styles.badgeYear}>2019</span>
            </div>
          </div>
          <div className={styles.aboutText}>
            <p className="section-label">Our Story</p>
            <h2 className="section-title">Island flavors, artisan craftsmanship</h2>
            <p className={styles.aboutBody}>
              Born from a love of Jamaican hospitality and a passion for bringing people
              together through food, Island Graze creates unforgettable culinary experiences.
              Every board tells a story — sourced fresh, assembled with care, and styled
              to delight.
            </p>
            <p className={styles.aboutBody}>
              From intimate gatherings in Tampa to grand celebrations across Jamaica, we
              bring the warmth and vibrancy of the Caribbean to every table we touch.
            </p>
            <ul className={styles.aboutFeatures}>
              {[
                'Fresh, locally-sourced ingredients',
                'Caribbean-inspired flavor pairings',
                'Fully customizable for your event',
                'Elegant presentation & styling',
              ].map(f => <li key={f}>{f}</li>)}
            </ul>
            <Link to="/services" className="btn btn-outline-dark">View Our Services</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const SERVICES = [
  {
    code: 'FL',
    title: 'Tampa, Florida',
    desc: 'Grazing carts, cocktail hour appetizers, and fully customizable boards for events across the Greater Tampa Bay Area.',
    href: '/services',
  },
  {
    code: 'JM',
    title: 'Jamaica',
    desc: 'Full-service catering for weddings, corporate events, private parties, and every special occasion island-wide.',
    href: '/services',
  },
  {
    lucideIcon: <Sparkles size={20} strokeWidth={2.5} color="var(--navy)" />,
    title: 'Custom Experiences',
    desc: 'Every offering is tailored to your event. Tell us your vision and we will craft a grazing experience around it.',
    href: '/contact',
  },
]

function FeaturedSection() {
  return (
    <section className={styles.featured}>
      <div className="container">
        <div className={styles.featuredHead}>
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Crafted experiences for every occasion</h2>
          <p className="section-subtitle">
            Whether it's a wedding, corporate event, birthday, or brunch, we design
            grazing experiences that feel as beautiful as they taste.
          </p>
        </div>
        <div className={styles.serviceCards}>
          {SERVICES.map(s => (
            <Link to={s.href} key={s.title} className={styles.serviceCard}>
              <div className={styles.cardIconWrap}>
                {s.lucideIcon ?? <span className={styles.cardCode}>{s.code}</span>}
              </div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <span className={styles.cardLink}>Learn more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaOverlay} />
      <div className={`container ${styles.ctaContent}`}>
        <p className="section-label" style={{ color: 'var(--gold)' }}>Ready to Graze?</p>
        <h2 className={styles.ctaTitle}>Let's create something beautiful together</h2>
        <p className={styles.ctaSub}>
          Tell us about your event and we'll design a grazing experience
          that leaves a lasting impression.
        </p>
        <Link to="/contact" className="btn btn-primary">Start Planning</Link>
      </div>
    </section>
  )
}

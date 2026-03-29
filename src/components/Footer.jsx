import { Link } from 'react-router-dom'
import { MailIcon, PhoneIcon, PinIcon, InstagramIcon } from './Icons'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIsland}>ISLAND</span>
            <span className={styles.logoGraze}>Graze</span>
          </Link>
          <p className={styles.tagline}>
            Bringing the taste of the islands<br />to your table.
          </p>
          <div className={styles.social}>
            <a
              href="https://instagram.com/island_graze"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
          </div>
        </div>

        {/* Nav */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navigate</h4>
          <ul className={styles.links}>
            {[['/', 'Home'], ['/services', 'Services'], ['/gallery', 'Gallery'], ['/contact', 'Contact']].map(([p, l]) => (
              <li key={p}><Link to={p} className={styles.link}>{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Services</h4>
          <ul className={styles.links}>
            {['Grazing Carts', 'Cocktail Hour Appetizers', 'Customizable Boards', 'Full-Service Catering'].map(s => (
              <li key={s}><Link to="/services" className={styles.link}>{s}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Get in Touch</h4>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.contactIcon}><MailIcon size={15} /></span>
              <a href="mailto:hello@islandgraze.com" className={styles.link}>hello@islandgraze.com</a>
            </li>
            <li>
              <span className={styles.contactIcon}><PhoneIcon size={15} /></span>
              <a href="tel:+18137506990" className={styles.link}>+1 (813)-750-6990</a>
            </li>
            <li>
              <span className={styles.contactIcon}><PinIcon size={15} /></span>
              <span>Tampa, FL &amp; Jamaica</span>
            </li>
            <li>
              <span className={styles.contactIcon}><InstagramIcon size={15} /></span>
              <a href="https://instagram.com/island_graze" target="_blank" rel="noreferrer" className={styles.link}>@island_graze</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Island Graze. All rights reserved.</p>
          <p>Crafted with love in Tampa &amp; Jamaica</p>
        </div>
      </div>
    </footer>
  )
}

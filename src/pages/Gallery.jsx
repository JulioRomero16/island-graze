import { useState } from 'react'
import { ZoomIcon } from '../components/Icons'
import styles from './Gallery.module.css'

const PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1576097449798-7c7f90e1248a?w=900&q=80&auto=format&fit=crop',
    alt: 'Artisan charcuterie board with cured meats and cheeses',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=900&q=80&auto=format&fit=crop',
    alt: 'Elegant cheese and charcuterie selection',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80&auto=format&fit=crop',
    alt: 'Colorful tropical food spread',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=80&auto=format&fit=crop',
    alt: 'Beautiful grazing table food spread',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1546069901-522a6a8ee19c?w=900&q=80&auto=format&fit=crop',
    alt: 'Fresh fruit and vegetable arrangement',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1551326844-4df70f2d7ef8?w=900&q=80&auto=format&fit=crop',
    alt: 'Fresh fruit platter with tropical selection',
  },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = (photo) => setLightbox(photo)
  const closeLightbox = () => setLightbox(null)
  const navLightbox = (dir) => {
    const idx = PHOTOS.findIndex(p => p.id === lightbox.id)
    const next = PHOTOS[(idx + dir + PHOTOS.length) % PHOTOS.length]
    setLightbox(next)
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <p className="section-label">Our Work</p>
          <h1 className={styles.heroTitle}>A Feast for the Eyes</h1>
          <p className={styles.heroSub}>
            Every board, cart, and table is a work of art. Browse our gallery
            for inspiration and imagine what we can create for your event.
          </p>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.grid}>
            {PHOTOS.map(photo => (
              <button
                key={photo.id}
                className={styles.photoCard}
                onClick={() => openLightbox(photo)}
                aria-label={`View ${photo.alt}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className={styles.photo}
                />
                <div className={styles.photoOverlay}>
                  <span className={styles.photoZoom}><ZoomIcon /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lbClose} onClick={closeLightbox} aria-label="Close">✕</button>
          <button className={`${styles.lbNav} ${styles.lbPrev}`} onClick={e => { e.stopPropagation(); navLightbox(-1) }} aria-label="Previous">‹</button>
          <div className={styles.lbImgWrap} onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} className={styles.lbImg} />
            <p className={styles.lbCaption}>{lightbox.alt}</p>
          </div>
          <button className={`${styles.lbNav} ${styles.lbNext}`} onClick={e => { e.stopPropagation(); navLightbox(1) }} aria-label="Next">›</button>
        </div>
      )}

      <InstagramCta />
    </>
  )
}

function InstagramCta() {
  return (
    <section className={styles.igCta}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="section-label">Follow the Journey</p>
        <h2 className={styles.igTitle}>See more on Instagram</h2>
        <p className={styles.igDesc}>
          Follow us <strong>@island_graze</strong> for daily inspiration, behind-the-scenes
          moments, and our latest creations.
        </p>
        <a
          href="https://www.instagram.com/island_graze"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline"
        >
          Follow @island_graze
        </a>
      </div>
    </section>
  )
}

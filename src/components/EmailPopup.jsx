import { useState, useEffect } from 'react'
import { CloseIcon } from './Icons'
import styles from './EmailPopup.module.css'

const STORAGE_KEY = 'ig_discount_popup_seen'
const DELAY_MS = 8000

const MAILCHIMP_U = import.meta.env.VITE_MAILCHIMP_U
const MAILCHIMP_AUDIENCE_ID = import.meta.env.VITE_MAILCHIMP_AUDIENCE_ID
const MAILCHIMP_SERVER_PREFIX = import.meta.env.VITE_MAILCHIMP_SERVER_PREFIX

export default function EmailPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const t = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setStatus('submitting')

    try {
      const params = new URLSearchParams({
        u: MAILCHIMP_U,
        id: MAILCHIMP_AUDIENCE_ID,
        EMAIL: email,
      })
      // Mailchimp's public list-subscribe endpoint (same one embedded signup
      // forms use) accepts unauthenticated form submissions, so no API key
      // is needed or exposed here. The request is opaque under no-cors, so
      // a completed request is treated as success.
      await fetch(
        `https://${MAILCHIMP_SERVER_PREFIX}.list-manage.com/subscribe/post?${params.toString()}`,
        { method: 'POST', mode: 'no-cors' }
      )
      setStatus('success')
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      setStatus('error')
      setError('Something went wrong — please try again.')
    }
  }

  if (!visible) return null

  return (
    <div className={styles.overlay} onClick={dismiss}>
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-headline"
      >
        <button className={styles.close} onClick={dismiss} aria-label="Close">
          <CloseIcon size={18} />
        </button>

        {status === 'success' ? (
          <div className={styles.successState}>
            <h3 id="popup-headline" className={styles.headline}>You're in!</h3>
            <p className={styles.subtext}>
              Your discount code is <strong>ISLAND10</strong> — we'll also send it to your email!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h3 id="popup-headline" className={styles.headline}>Get 10% Off Your First Order</h3>
            <p className={styles.subtext}>
              Enter your email and we'll send you an exclusive discount code
            </p>
            <div className={styles.field}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={error ? styles.inputErr : ''}
                aria-label="Email address"
              />
              {error && <span className={styles.fieldError}>{error}</span>}
            </div>
            <button type="submit" className={styles.submit} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting…' : 'Claim My Discount'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

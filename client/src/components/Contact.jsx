import { useApp } from '../context/AppContext'
import { CONTACT } from '../data/content'
import LeadForm from './LeadForm'
import Logo from './Logo'

/* One place builds the WhatsApp deep link, so the number and the opening
   message never drift apart between the hero, the contact card and the
   footer. wa.me works on desktop web, the desktop app and mobile. */
export function waLink(text) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
}

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.8 9.8 0 0 0 4.68 1.2h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.03-5.1-2.89-6.96A9.78 9.78 0 0 0 12.04 2m0 1.8c2.15 0 4.17.84 5.69 2.36a7.98 7.98 0 0 1 2.36 5.68c0 4.45-3.62 8.05-8.06 8.05a8.1 8.1 0 0 1-4.11-1.12l-.29-.18-3.05.8.81-2.98-.19-.3a8 8 0 0 1-1.23-4.27c0-4.44 3.62-8.04 8.07-8.04m-3.1 4.3c-.14 0-.38.06-.58.28-.2.22-.76.75-.76 1.82s.78 2.11.89 2.26c.11.14 1.52 2.42 3.75 3.3 1.85.73 2.23.58 2.63.55.4-.04 1.29-.53 1.47-1.04.18-.51.18-.95.13-1.04-.05-.09-.2-.15-.42-.26-.22-.11-1.29-.64-1.49-.71-.2-.07-.35-.11-.49.11-.15.22-.57.71-.7.86-.13.14-.26.16-.48.05-.22-.11-.93-.34-1.77-1.09-.65-.58-1.1-1.3-1.22-1.52-.13-.22-.02-.34.1-.45.1-.1.22-.26.33-.39.11-.13.14-.22.22-.37.07-.15.04-.28-.02-.39-.05-.11-.48-1.19-.68-1.62-.17-.38-.35-.34-.48-.35z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34v7.03C18.34 21.24 22 17.08 22 12.06" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.8M9.55 15.57V8.43L15.82 12z" />
    </svg>
  )
}

function RedditIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 3.31 1.34 6.31 3.52 8.49l-2.29 2.28A.72.72 0 0 0 1.74 24H12c6.63 0 12-5.37 12-12S18.63 0 12 0m4.39 3.2a2 2 0 1 1-1.95 2.46 2.37 2.37 0 0 0-2.03 2.34v.01c1.78.07 3.4.57 4.69 1.36a2.8 2.8 0 1 1 2.91 4.76c-.09 3.25-3.64 5.87-8 5.87s-7.9-2.62-8-5.87a2.8 2.8 0 0 1 .93-5.44c.31 0 .6.05.88.14 1.29-.79 2.91-1.29 4.69-1.36v-.01a3.24 3.24 0 0 1 2.89-3.21 2 2 0 0 1 2-1.85M9.25 12c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25S9.94 12 9.25 12m5.5 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25S16 13.94 16 13.25 15.44 12 14.75 12m-5.47 3.99a.33.33 0 0 0-.23.56c.84.85 2.48.92 2.96.92s2.11-.06 2.96-.92a.36.36 0 0 0 .03-.46.33.33 0 0 0-.46 0c-.55.53-1.69.73-2.52.73s-1.98-.2-2.51-.73a.33.33 0 0 0-.23-.1" />
    </svg>
  )
}

/* Keyed on the label in content.js so all three languages resolve to the
   same mark — the labels stay in the data as the accessible name. */
const SOCIAL_ICONS = {
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  reddit: RedditIcon,
  linkedin: LinkedInIcon,
}

export default function Contact() {
  const { t } = useApp()

  const wa = waLink(
    'Hello eZentix Labs — I run a business and I would like to talk about going online.',
  )

  return (
    <section className="band" id="talk">
      <div className="wrap lead">
        <div>
          <h2 style={{ fontSize: 'clamp(27px, 4vw, 38px)' }}>{t.lead.title}</h2>
          <p className="lede" style={{ marginTop: 14 }}>{t.lead.sub}</p>

          <div className="contact-actions">
            <a className="contact-card" href={`mailto:${CONTACT.admin}`}>
              <span className="contact-card__k">{t.contact.email}</span>
              <span className="contact-card__v">{CONTACT.admin}</span>
            </a>
            <a className="contact-card" href={`tel:${CONTACT.phone}`}>
              <span className="contact-card__k">{t.contact.call}</span>
              <span className="contact-card__v">{CONTACT.phoneDisplay}</span>
            </a>
            <a
              className="contact-card"
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-card__k">{t.contact.whatsapp}</span>
              <span className="contact-card__v">{CONTACT.phoneDisplay}</span>
            </a>
          </div>

          <div className="details">
            <div>
              <div className="detail__k">{t.contact.adminLabel}</div>
              <div className="detail__v">{CONTACT.admin}</div>
            </div>
            <div>
              <div className="detail__k">{t.contact.supportLabel}</div>
              <div className="detail__v">{CONTACT.support}</div>
            </div>
            <div>
              <div className="detail__k">{t.contact.phoneLabel}</div>
              <div className="detail__v">{CONTACT.phoneDisplay}</div>
            </div>
            <div>
              <div className="detail__k">{t.contact.addressLabel}</div>
              <div className="detail__v">{t.contact.address}</div>
            </div>
          </div>
        </div>

        <LeadForm />
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useApp()
  const wa = waLink('Hello eZentix Labs — I would like to start a conversation.')

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__logo">
              <span className="footer__mark" aria-hidden="true">
                <Logo />
              </span>
              <span className="footer__name">{t.brand}</span>
            </span>

            <p className="footer__blurb">{t.footer.blurb}</p>

            <a className="btn btn--wa" href={wa} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {t.footer.cta}
            </a>
          </div>

          <nav className="footer__col" aria-label={t.footer.exploreTitle}>
            <h3 className="footer__h">{t.footer.exploreTitle}</h3>
            <ul className="footer__links">
              {t.footer.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h3 className="footer__h">{t.footer.reachTitle}</h3>
            <p className="footer__where">{t.footer.where}</p>
            <p className="footer__where">
              <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
              {' · '}
              <a href={`mailto:${CONTACT.admin}`}>{CONTACT.admin}</a>
            </p>
            <div className="footer__social">
              {t.footer.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.label.toLowerCase().replace(/\s/g, '')]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {Icon ? <Icon /> : s.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="footer__bar">
          <span>{t.footer.rights}</span>
          <span className="footer__bar-right">{t.footer.note}</span>
        </div>
      </div>
    </footer>
  )
}

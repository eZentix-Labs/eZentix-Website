import { useApp } from '../context/AppContext'
import Logo from './Logo'
import Rich from './Rich'
import { waLink } from './Contact'

/* ------------------------------------------------------------------
 * The ecosystem, orbiting the headline.
 *
 * Custom line-art rather than an icon font or emoji: every glyph is
 * drawn on the same 24-unit grid with the same 1.6 stroke, so the ring
 * reads as one designed set instead of seven borrowed pictures. Each
 * icon carries one accent-filled shape — the small solid note that
 * keeps them from looking like generic wireframes.
 * ------------------------------------------------------------------ */
const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function IconBilling() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M6 3.2h12v17.6l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z" />
      <path d="M9 8h6M9 11.5h6" />
      <circle cx="12" cy="15.6" r="1.5" fill="currentColor" stroke="none" opacity="0.9" />
    </svg>
  )
}

function IconCrm() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.4 19.2a5.8 5.8 0 0 1 11.2 0" />
      <circle cx="17.6" cy="6.6" r="2.2" fill="currentColor" stroke="none" opacity="0.9" />
      <path d="M16.6 12.4a4.6 4.6 0 0 1 4 4.2" />
    </svg>
  )
}

function IconInventory() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M3.4 7.6 12 3.4l8.6 4.2v8.8L12 20.6l-8.6-4.2z" />
      <path d="M3.4 7.6 12 11.9l8.6-4.3M12 11.9v8.7" />
      <path d="M7.7 5.5 16.3 9.8v3" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M20.4 11.6c0 4-3.8 7.2-8.4 7.2a9.6 9.6 0 0 1-2.9-.44L4.2 20l1.3-3.6a6.8 6.8 0 0 1-1.9-4.8c0-4 3.8-7.2 8.4-7.2s8.4 3.2 8.4 7.2z" />
      <circle cx="8.9" cy="11.6" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11.6" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="15.1" cy="11.6" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconReach() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M4 9.4v4.6a1.2 1.2 0 0 0 1.2 1.2h2.3l7.9 4.4V4.4L7.5 8.8H5.2A1.2 1.2 0 0 0 4 10z" />
      <path d="M7.5 15.2v3.4a1.4 1.4 0 0 0 2.8 0v-1.9" />
      <path d="M18.6 8.4a5.2 5.2 0 0 1 0 7.2" />
    </svg>
  )
}

function IconWeb() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.4a13 13 0 0 1 0 17.2 13 13 0 0 1 0-17.2z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" opacity="0.9" />
    </svg>
  )
}

function IconAi() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M12 2.8 13.5 8 18.6 9.5 13.5 11 12 16.2 10.5 11 5.4 9.5 10.5 8z" fill="currentColor" stroke="none" opacity="0.92" />
      <path d="M17.8 15.4l.75 2.35 2.35.75-2.35.75-.75 2.35-.75-2.35-2.35-.75 2.35-.75z" />
      <path d="M5.6 15.8l.55 1.7 1.7.55-1.7.55-.55 1.7-.55-1.7-1.7-.55 1.7-.55z" />
    </svg>
  )
}

function IconBooks() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M4 4.6h6.2a2 2 0 0 1 1.8 1.9v12a1.6 1.6 0 0 0-1.5-1.1H4z" />
      <path d="M20 4.6h-6.2a2 2 0 0 0-1.8 1.9v12a1.6 1.6 0 0 1 1.5-1.1H20z" />
      <path d="M12 6.5v12" />
    </svg>
  )
}

function IconCare() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M12 20.4S4.2 15.6 4.2 10.2A4 4 0 0 1 12 8.3a4 4 0 0 1 7.8 1.9c0 5.4-7.8 10.2-7.8 10.2z" />
      <path d="M12 10.6v3.4M10.3 12.3h3.4" />
    </svg>
  )
}

function IconStore() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M4.4 8.6h15.2l-1 11.2H5.4z" />
      <path d="M8.6 10.6V7.4a3.4 3.4 0 0 1 6.8 0v3.2" />
      <circle cx="12" cy="14.2" r="1.3" fill="currentColor" stroke="none" opacity="0.9" />
    </svg>
  )
}

function IconAds() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M12 3.2 14 9l5.8 2-5.8 2-2 5.8-2-5.8L4.2 11 10 9z" />
      <path d="M18.6 4.2v3M17.1 5.7h3" />
    </svg>
  )
}

/* Three levels. The inner three ride close to the mark and tuck behind the
   feathers as they pass; the outer four sweep wider, the other way round.
   The peacock is painted above both, which is what sells the depth. */
const ORBIT_LEVELS = [
  {
    key: 'inner',
    ring: 'in',
    items: [
      { key: 'os', Icon: IconBilling, label: 'Zen OS' },
      { key: 'stock', Icon: IconInventory, label: 'Zen Stock' },
      { key: 'crm', Icon: IconCrm, label: 'Zen CRM' },
    ],
  },
  {
    key: 'mid',
    ring: 'mid',
    items: [
      { key: 'connect', Icon: IconChat, label: 'Zen Connect' },
      { key: 'books', Icon: IconBooks, label: 'Zen Books' },
      { key: 'care', Icon: IconCare, label: 'Zen Care' },
      { key: 'store', Icon: IconStore, label: 'Zen Store' },
    ],
  },
  {
    key: 'outer',
    ring: 'out',
    items: [
      { key: 'reach', Icon: IconReach, label: 'Zen Reach' },
      { key: 'ads', Icon: IconAds, label: 'Zen Ads' },
      { key: 'site', Icon: IconWeb, label: 'Zen Site' },
      { key: 'ai', Icon: IconAi, label: 'Zen AI' },
    ],
  },
]

function OrbitServices() {
  return (
    <div className="orbit" aria-hidden="true">
      <div className="orbit__ring orbit__ring--in" />
      <div className="orbit__ring orbit__ring--mid" />
      <div className="orbit__ring orbit__ring--out" />

      {ORBIT_LEVELS.map((level) => (
        <div className={`orbit__level orbit__level--${level.ring}`} key={level.key}>
          {level.items.map((item, i) => (
            <div
              className="orbit__item"
              key={item.key}
              style={{ '--i': i, '--n': level.items.length }}
            >
              {/* Counter-rotated so the chip stays upright the whole way round. */}
              <div className="orbit__chip">
                <span className="orbit__glyph">
                  <item.Icon />
                </span>
                <span className="orbit__label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Painted last: the feathers sit over the orbits, not inside a disc. */}
      <div className="orbit__mark">
        <Logo />
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useApp()

  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div>
          <h1>
            {t.hero.title.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </h1>

          <p className="hero__sub"><Rich text={t.hero.sub} /></p>
          <p className="hero__body">{t.hero.body}</p>

          <div className="hero__cta">
            {/* Talk to Us goes straight into WhatsApp with the message
                already written — one tap from here to a real chat. */}
            <a
              className="btn btn--primary"
              href={waLink(t.hero.waText)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.hero.ctaPrimary}
            </a>
            <a className="btn btn--ghost" href="#talk">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <OrbitServices />
      </div>
    </section>
  )
}

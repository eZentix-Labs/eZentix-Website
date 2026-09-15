import { useEffect, useRef, useState } from 'react'
import { useApp } from '../context/AppContext'

/* ------------------------------------------------------------------
 * OUR WORK — case studies.
 * ------------------------------------------------------------------
 * A grid of client cards (t.work.items, from content.js). Clicking one
 * opens a detail view: the product photos, then the problem, then the
 * solution we shipped. Add more clients by adding another object to
 * `items` in each language block — nothing else needs to change.
 *
 * Cover/gallery images live in public/work/<id>/ — see that folder's
 * placeholder .svg files for the exact names to replace with real
 * photos.
 * ------------------------------------------------------------------ */
export default function Work() {
  const { t } = useApp()
  const [openId, setOpenId] = useState(null)
  const active = t.work.items.find((i) => i.id === openId) || null

  return (
    <section className="band" id="work">
      <div className="wrap">
        <div className="head">
          <div className="eyebrow">{t.work.eyebrow}</div>
          <h2>{t.work.title}</h2>
          <p>{t.work.sub}</p>
        </div>

        <div className="work-grid">
          {t.work.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className="work-card"
              onClick={() => setOpenId(item.id)}
            >
              <span className="work-card__cover">
                <img src={item.cover} alt={item.client} loading="lazy" />
              </span>
              <span className="work-card__body">
                <span className="work-card__client">{item.client}</span>
                <span className="work-card__tagline">{item.tagline}</span>
                <span className="work-card__cta">{t.work.viewCta} →</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <CaseModal item={active} t={t} onClose={() => setOpenId(null)} />
    </section>
  )
}

function CaseModal({ item, t, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!item) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="modal-scrim" onClick={onClose} role="presentation">
      <div
        className="case-modal"
        role="dialog"
        aria-modal="true"
        aria-label={item.client}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__head">
          <div>
            <div className="case-modal__eyebrow">{t.work.case}</div>
            <h2>{item.client}</h2>
          </div>
          <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label={t.work.close}>
            ×
          </button>
        </div>

        <div className="case-modal__gallery">
          <div className="case-modal__eyebrow case-modal__eyebrow--tight">{t.work.galleryLabel}</div>
          <div className="case-modal__grid">
            {item.gallery.map((src) => (
              <img key={src} src={src} alt={item.client} loading="lazy" />
            ))}
          </div>
        </div>

        <div className="case-modal__block">
          <h3>{t.work.problemLabel}</h3>
          <p>{item.problem}</p>
        </div>

        <div className="case-modal__block case-modal__block--good">
          <h3>{t.work.solutionLabel}</h3>
          <p>{item.solution}</p>
        </div>
      </div>
    </div>
  )
}

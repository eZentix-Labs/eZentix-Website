import { useApp } from '../context/AppContext'
import Rich from './Rich'

/* ------------------------------------------------------------------ */
export function WhoWeAre() {
  const { t } = useApp()
  return (
    <section className="band band--who">
      <div className="wrap">
        {/* A single centred card rather than a left-aligned column —
            the old layout left a dead half-screen to the right. */}
        <article className="who-card">
          <div className="who-card__eyebrow">{t.who.eyebrow}</div>
          <h2 className="who-card__title"><Rich text={t.who.title} /></h2>
          <p className="who-card__body">{t.who.body}</p>
        </article>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
 * "What we do" doubles as a checkbox picker — visitors tick what they
 * want, and the count/CTA bar carries the selection down to the lead
 * form. No pricing shown here on purpose; this is a conversation
 * starter, not a checkout.
 * ------------------------------------------------------------------ */
export function WhatWeDo() {
  const { t, selectedServices, toggleService } = useApp()
  const count = selectedServices.length

  return (
    <section className="band band--tint" id="services">
      <div className="wrap">
        <div className="head">
          <h2>{t.what.title}</h2>
          <p>{t.what.body}</p>
        </div>

        <div className="pillars">
          {t.what.pillars.map((p, i) => (
            <article className="pillar" key={p.name}>
              <span className="pillar__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.name}</h3>
              <p className="pillar__line">{p.line}</p>
              <ul className="pillar__picks">
                {p.items.map((item) => {
                  const id = `svc-${item}`
                  const checked = selectedServices.includes(item)
                  return (
                    <li key={item}>
                      <label className={`pick${checked ? ' pick--on' : ''}`} htmlFor={id}>
                        <input
                          type="checkbox"
                          id={id}
                          checked={checked}
                          onChange={() => toggleService(item)}
                        />
                        <span className="pick__box" aria-hidden="true" />
                        <span className="pick__text">{item}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </article>
          ))}
        </div>

        <div className={`pick-bar${count > 0 ? ' pick-bar--active' : ''}`}>
          <span className="pick-bar__count">
            {count > 0 ? t.what.pickCount(count) : t.what.pickNone}
          </span>
          {count > 0 && (
            <a className="btn btn--primary" href="#talk">
              {t.what.pickCta}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
 * Numbering is deliberate here: this really is a sequence, and the
 * "when" column carries information the reader needs.
 * ------------------------------------------------------------------ */
export function HowItWorks() {
  const { t } = useApp()
  return (
    <section className="band" id="how">
      <div className="wrap">
        <div className="head">
          <h2>{t.how.title}</h2>
        </div>

        <div className="timeline">
          {t.how.steps.map((s) => (
            <div className="step" key={s.name}>
              <div className="step__when">{s.when}</div>
              <div>
                <h3>{s.name}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
export function WhyEzentixLabs() {
  const { t } = useApp()
  return (
    <section className="band band--tint">
      <div className="wrap">
        <div className="head">
          <h2>{t.why.title}</h2>
        </div>

        <div className="compare">
          <article className="compare__card">
            <div className="compare__label">{t.why.before.label}</div>
            <h3>{t.why.before.head}</h3>
            <p>{t.why.before.body}</p>
          </article>

          <article className="compare__card compare__card--good">
            <div className="compare__label">{t.why.after.label}</div>
            <h3>{t.why.after.head}</h3>
            <p>{t.why.after.body}</p>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
export function Founder() {
  const { t } = useApp()
  return (
    <section className="band" id="founder">
      <div className="wrap">
        <div className="founder">
          {/* Cut-out portrait on a neutral panel — the backdrop is CSS, not
              baked into the file, so it follows the light/dark theme. */}
          <figure className="founder__photo">
            <img src="/founder.webp" alt={t.founder.name} width="560" height="700" loading="lazy" />
          </figure>
          <div>
            <div className="eyebrow">{t.founder.label}</div>
            <h2 className="founder__name">{t.founder.name}</h2>
            <div className="founder__role">{t.founder.role}</div>
            <p className="founder__body">{t.founder.body}</p>
            <p className="founder__quote">{t.founder.quote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

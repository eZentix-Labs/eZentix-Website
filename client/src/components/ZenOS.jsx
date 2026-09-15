import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../context/AppContext'
import { CAPABILITIES, TIERS, ADD_ONS, rupee } from '../data/pricing'

/* Chips are derived from TIERS[].forWhom — pricing.js stays the one
   file that owns this copy; we just split "Chai stall, sweet shop,
   takeaway counter" into individual chips and remember which tier
   each phrase came from. */
function useBizChips() {
  return useMemo(
    () =>
      TIERS.flatMap((tier) =>
        tier.forWhom.split(',').map((label) => ({ label: label.trim(), tierId: tier.id })),
      ),
    [],
  )
}

/* ------------------------------------------------------------------
 * Signature element: a restaurant floor that fills up while you watch.
 * It is the one thing on the page that behaves like the product does.
 * ------------------------------------------------------------------ */
const STATES = ['free', 'occupied', 'billed']
const TABLE_COUNT = 12

function LiveFloor() {
  const { t } = useApp()
  const [tables, setTables] = useState(() =>
    Array.from({ length: TABLE_COUNT }, (_, i) => (i < 4 ? 'occupied' : i < 6 ? 'billed' : 'free')),
  )

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const id = setInterval(() => {
      setTables((prev) => {
        const next = [...prev]
        const i = Math.floor(Math.random() * TABLE_COUNT)
        const cur = STATES.indexOf(next[i])
        next[i] = STATES[(cur + 1) % STATES.length]
        return next
      })
    }, 1600)

    return () => clearInterval(id)
  }, [])

  const label = { free: t.pos.free, occupied: t.pos.occupied, billed: t.pos.billed }

  return (
    <div className="floor">
      <div className="floor__top">
        <div>
          <div className="floor__title">{t.pos.floorTitle}</div>
        </div>
        <span className="floor__live">
          <span className="floor__pulse" aria-hidden="true" />
          Live
        </span>
      </div>

      <div className="floor__grid" role="img" aria-label={t.pos.floorSub}>
        {tables.map((state, i) => (
          <div className="table-cell" data-state={state} key={i}>
            <span className="table-cell__n">{String(i + 1).padStart(2, '0')}</span>
            <span className="table-cell__s">{label[state]}</span>
          </div>
        ))}
      </div>

      <div className="floor__foot">
        <span className="legend">
          <span className="legend__swatch" aria-hidden="true" />
          {t.pos.free}
        </span>
        <span className="legend">
          <span className="legend__swatch legend__swatch--occupied" aria-hidden="true" />
          {t.pos.occupied}
        </span>
        <span className="legend">
          <span className="legend__swatch legend__swatch--billed" aria-hidden="true" />
          {t.pos.billed}
        </span>
      </div>
    </div>
  )
}


/* ------------------------------------------------------------------
 * FEATURE BANNERS
 * ------------------------------------------------------------------
 * One capability at a time, full width, auto-advancing. Each slide
 * pops in rather than sliding, because a scale-and-lift reads as "here
 * is the next thing" far faster than horizontal travel at this size.
 *
 * The timer pauses on hover and on focus, and stops entirely when the
 * section is off screen — an invisible carousel burning a timer is
 * just battery drain.
 * ------------------------------------------------------------------ */
const HOLD = 4200

function FeatureBanners() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const wrapRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const n = CAPABILITIES.length

  useEffect(() => {
    const el = wrapRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !visible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => setI((v) => (v + 1) % n), HOLD)
    return () => clearTimeout(id)
  }, [i, paused, visible, n])

  const go = (next) => setI((v) => (v + next + n) % n)
  const active = CAPABILITIES[i]

  return (
    <div
      className="banners"
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="banner" key={active.id} aria-live="polite">
        <div className="banner__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
        <div className="banner__text">
          <h3 className="banner__name">{active.name}</h3>
          <p className="banner__blurb">{active.blurb}</p>
        </div>
        <div className="banner__count" aria-hidden="true">
          {i + 1} / {n}
        </div>
        <span
          className="banner__timer"
          aria-hidden="true"
          key={`t-${i}-${paused}-${visible}`}
          data-run={!paused && visible}
        />
      </div>

      <div className="banners__nav">
        <button type="button" aria-label="Previous feature" onClick={() => go(-1)}>←</button>
        <div className="banners__dots">
          {CAPABILITIES.map((c, k) => (
            <button
              key={c.id}
              type="button"
              className={`banners__dot${k === i ? ' is-on' : ''}`}
              aria-label={c.name}
              aria-current={k === i}
              onClick={() => setI(k)}
            />
          ))}
        </div>
        <button type="button" aria-label="Next feature" onClick={() => go(1)}>→</button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
function PlanCard({ tier, cycle, onChoose, matchState }) {
  const { t } = useApp()
  const isYearly = cycle === 'annual'
  const amount = isYearly ? tier.annual : tier.monthly
  const matchClass = matchState === 'match' ? ' plan--match' : matchState === 'dim' ? ' plan--dim' : ''

  return (
    <article className={`plan${tier.highlight ? ' plan--hero' : ''}${matchClass}`}>
      {tier.highlight && <span className="plan__flag">{t.pos.popular}</span>}

      <div className="plan__name">{tier.name}</div>
      <div className="plan__tag">{tier.tagline}</div>

      <div className="plan__price">
        <span className="plan__amt">{rupee(amount)}</span>
        <span className="plan__per">{isYearly ? t.pos.perYear : t.pos.perMonth}</span>
      </div>
      <div className="plan__alt">
        {isYearly ? `${rupee(Math.round(tier.annual / 12))}${t.pos.perMonth}, ${t.pos.billedAnnually}` : ''}
      </div>

      <div className="plan__who">{tier.forWhom}</div>

      <div className="plan__limits">
        {tier.limits.map((l) => (
          <div className="limit" key={l.label}>
            <div className="limit__k">{l.label}</div>
            <div className="limit__v">{l.value}</div>
          </div>
        ))}
      </div>

      <ul className="plan__list">
        {tier.includes.map((f) => (
          <li key={f}>
            <span className="tick" aria-hidden="true">✓</span>
            {f}
          </li>
        ))}
      </ul>

      {tier.excludes.length > 0 && (
        <div className="plan__no">
          <div className="plan__no-h">{t.pos.notIncluded}</div>
          <ul>
            {tier.excludes.map((f) => (
              <li key={f}>
                <span className="cross" aria-hidden="true">×</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className={`btn btn--block ${tier.highlight ? 'btn--primary' : 'btn--ghost'}`}
        onClick={() => onChoose(tier)}
      >
        {t.pos.choose} {tier.name}
      </button>
    </article>
  )
}

/* ------------------------------------------------------------------ */
export default function ZenOS({ onChoosePlan }) {
  const { t } = useApp()
  const [cycle, setCycle] = useState('monthly')
  const [activeChip, setActiveChip] = useState(null)
  const bizChips = useBizChips()

  const activeTierId = bizChips.find((c) => c.label === activeChip)?.tierId ?? null

  return (
    <section className="band band--tint" id="zen-os">
      <div className="wrap">
        <div className="pos-head">
          <div>
            <div className="eyebrow">{t.pos.eyebrow}</div>
            <h2>{t.pos.title}</h2>
            <p className="pos-head__sub">{t.pos.sub}</p>
            <p className="pos-head__body">{t.pos.body}</p>
          </div>
          <LiveFloor />
        </div>

        {/* What is inside — one banner at a time, auto-advancing */}
        <div className="head" style={{ marginTop: '56px' }}>
          <h2 style={{ fontSize: '26px' }}>{t.pos.featuresTitle}</h2>
        </div>
        <FeatureBanners />

        {/* Pricing */}
        <div className="head" style={{ marginTop: '64px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '26px' }}>{t.pos.pricingTitle}</h2>
        </div>

        <div className="biz-filter">
          <div className="biz-filter__label">{t.pos.bizFilterLabel}</div>
          <div className="biz-chips">
            {bizChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                className="biz-chip"
                aria-pressed={activeChip === chip.label}
                onClick={() => setActiveChip((cur) => (cur === chip.label ? null : chip.label))}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div className="cycle">
          <div className="segmented" role="group" aria-label={t.pos.pricingTitle}>
            <button onClick={() => setCycle('monthly')} aria-pressed={cycle === 'monthly'}>
              {t.pos.monthly}
            </button>
            <button onClick={() => setCycle('annual')} aria-pressed={cycle === 'annual'}>
              {t.pos.annual}
            </button>
          </div>
        </div>
        <p className="cycle__note">
          {cycle === 'annual' && <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓ </span>}
          {t.pos.annualNote}
        </p>

        <div className="plans">
          {TIERS.map((tier) => (
            <PlanCard
              key={tier.id}
              tier={tier}
              cycle={cycle}
              onChoose={onChoosePlan}
              matchState={!activeTierId ? null : tier.id === activeTierId ? 'match' : 'dim'}
            />
          ))}
        </div>

        {/* Add-ons */}
        <div className="addons">
          <h3>{t.pos.addOnsTitle}</h3>
          {ADD_ONS.map((a) => (
            <div className="addon" key={a.name}>
              <div>
                <div style={{ fontWeight: 600 }}>{a.name}</div>
                <div className="addon__note">{a.note}</div>
              </div>
              <div className="addon__price">
                {rupee(a.price)}
                <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}> / {a.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

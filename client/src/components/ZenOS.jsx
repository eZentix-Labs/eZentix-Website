import { useEffect, useRef, useState } from 'react'
import { useApp } from '../context/AppContext'
import { CAPABILITIES } from '../data/pricing'

/* ------------------------------------------------------------------
 * Signature element: a restaurant floor that fills up while you watch.
 * It is the one thing on the page that behaves like the product does.
 * ------------------------------------------------------------------ */
const STATES = ['free', 'occupied', 'billed']
const TABLE_COUNT = 12

function LiveFloor() {
  const { t } = useApp()
  const floorRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [tables, setTables] = useState(() =>
    Array.from({ length: TABLE_COUNT }, (_, i) => (i < 4 ? 'occupied' : i < 6 ? 'billed' : 'free')),
  )

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    })
    observer.observe(floorRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !visible) return

    const id = setInterval(() => {
      if (document.hidden) return
      setTables((prev) => {
        const next = [...prev]
        const i = Math.floor(Math.random() * TABLE_COUNT)
        const cur = STATES.indexOf(next[i])
        next[i] = STATES[(cur + 1) % STATES.length]
        return next
      })
    }, 1600)

    return () => clearInterval(id)
  }, [visible])

  const label = { free: t.pos.free, occupied: t.pos.occupied, billed: t.pos.billed }

  return (
    <div className="floor" ref={floorRef}>
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
          <h4 className="banner__name">{active.name}</h4>
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
/* Plans and prices are deliberately not shown on the public site — the
   conversation sets the price. TIERS and ADD_ONS stay in data/pricing.js
   (the account portal still reads it) if a pricing table ever comes back. */
export default function ZenOS() {
  const { t } = useApp()

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
          <h3 style={{ fontSize: '26px' }}>{t.pos.featuresTitle}</h3>
        </div>
        <FeatureBanners />
      </div>
    </section>
  )
}

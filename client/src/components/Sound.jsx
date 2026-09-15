import { useEffect, useRef, useState } from 'react'
import { useApp } from '../context/AppContext'

/* ------------------------------------------------------------------
 * BRAND TUNE
 * ------------------------------------------------------------------
 * The asset is cut so the track arrives rather than starts: four bars
 * of build-up, then the bass drop, then a 24-bar body that loops. The
 * loop points below are sample-derived from the tempo grid (147.66 BPM,
 * 1.6254s per bar) and the body was crossfaded onto itself, so the wrap
 * is continuous — no click, and it can run indefinitely.
 *
 * It plays through the Web Audio API rather than an <audio> element
 * because only AudioBufferSourceNode loops sample-accurately; the
 * timeupdate trick on <audio> leaves an audible gap every cycle.
 *
 * Browsers refuse to start audio before the visitor interacts with the
 * page, so we arm it on mount and let the first click, key press or
 * scroll release it. The choice is remembered, and someone who mutes it
 * never hears anything on a later visit.
 * ------------------------------------------------------------------ */
const TUNE_URL = '/tune.mp3'
const LOOP_START = 6.5014 // the drop, in seconds into the asset
const LOOP_END = 45.50995 // end of bar 24 — set explicitly so codec padding is excluded
const FADE = 0.7
const LEVEL = 0.42 // background music, not a foreground event

function SpeakerOn() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6.5 9H3v6h3.5L11 19z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  )
}

function SpeakerOff() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6.5 9H3v6h3.5L11 19z" />
      <path d="M16 10l4 4M20 10l-4 4" />
    </svg>
  )
}

export default function Sound() {
  const { t, soundOn, setSoundOn } = useApp()
  const ref = useRef({ ctx: null, buffer: null, src: null, gain: null, loading: null })
  const [playing, setPlaying] = useState(false)

  const ctxOf = () => {
    const r = ref.current
    if (!r.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return null
      r.ctx = new AC()
      r.gain = r.ctx.createGain()
      r.gain.gain.value = 0
      r.gain.connect(r.ctx.destination)
    }
    return r.ctx
  }

  const load = (ctx) => {
    const r = ref.current
    if (r.buffer) return Promise.resolve(r.buffer)
    if (!r.loading) {
      r.loading = fetch(TUNE_URL)
        .then((res) => res.arrayBuffer())
        .then((buf) => new Promise((ok, no) => ctx.decodeAudioData(buf, ok, no)))
        .then((decoded) => {
          r.buffer = decoded
          return decoded
        })
    }
    return r.loading
  }

  /* Create the source and fade it in. Only ever called with a running
     context, so the promise below always settles. */
  const play = (ctx) => {
    const r = ref.current
    if (r.src || r.arming) return
    r.arming = true
    load(ctx)
      .then((buffer) => {
        if (r.src || !r.ctx) return
        const src = ctx.createBufferSource()
        src.buffer = buffer
        src.loop = true
        src.loopStart = LOOP_START
        src.loopEnd = LOOP_END
        src.connect(r.gain)
        src.start(0) // from 0: the build-up plays once, then the body loops
        r.src = src
        const now = ctx.currentTime
        r.gain.gain.cancelScheduledValues(now)
        r.gain.gain.setValueAtTime(0.0001, now)
        r.gain.gain.linearRampToValueAtTime(LEVEL, now + FADE)
        setPlaying(true)
      })
      .catch(() => {})
      .finally(() => {
        r.arming = false
      })
  }

  const stop = () => {
    const r = ref.current
    if (!r.ctx || !r.src) return
    const now = r.ctx.currentTime
    r.gain.gain.cancelScheduledValues(now)
    r.gain.gain.setValueAtTime(r.gain.gain.value, now)
    r.gain.gain.linearRampToValueAtTime(0.0001, now + 0.35)
    const src = r.src
    r.src = null
    setPlaying(false)
    setTimeout(() => {
      try {
        src.stop()
      } catch {
        /* already stopped */
      }
    }, 420)
  }

  /* Arm on mount.
     Chrome leaves ctx.resume() PENDING — not rejected — until a real
     gesture arrives, so we cannot await it to decide whether we may
     play. Instead every gesture nudges resume(), and the context's own
     statechange event tells us the moment it actually starts running.
     That is the only signal that is true in every browser. */
  useEffect(() => {
    if (!soundOn) return
    const ctx = ctxOf()
    if (!ctx) return

    const attempt = () => {
      if (ref.current.src) return
      if (ctx.state === 'running') play(ctx)
      else ctx.resume().catch(() => {})
    }

    const onState = () => {
      if (ctx.state === 'running') attempt()
    }
    ctx.addEventListener('statechange', onState)
    attempt() // already running on a repeat visit? then it starts here

    const evs = ['pointerdown', 'keydown', 'scroll', 'touchstart']
    const opts = { passive: true }
    evs.forEach((e) => window.addEventListener(e, attempt, opts))
    return () => {
      ctx.removeEventListener('statechange', onState)
      evs.forEach((e) => window.removeEventListener(e, attempt))
    }
  }, [soundOn])

  useEffect(() => () => stop(), [])

  const toggle = () => {
    const next = !soundOn
    setSoundOn(next)
    if (!next) {
      stop()
      return
    }
    // Clicking the button is itself the gesture, so this always lands.
    const ctx = ctxOf()
    if (!ctx) return
    if (ctx.state === 'running') play(ctx)
    else ctx.resume().then(() => play(ctx)).catch(() => {})
  }

  return (
    <button
      className={`icon-btn${soundOn ? ' icon-btn--live' : ''}`}
      onClick={toggle}
      aria-pressed={soundOn}
      aria-label={soundOn ? t.nav.soundOff : t.nav.soundOn}
      title={soundOn ? t.nav.soundOff : t.nav.soundOn}
    >
      {soundOn ? <SpeakerOn /> : <SpeakerOff />}
      {soundOn && !playing && <span className="icon-btn__ping" aria-hidden="true" />}
      {playing && (
        <span className="eq" aria-hidden="true">
          <i /><i /><i />
        </span>
      )}
    </button>
  )
}

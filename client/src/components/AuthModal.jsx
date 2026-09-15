import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

/* ------------------------------------------------------------------
 * AUTH
 * ------------------------------------------------------------------
 * signIn / signUp post to the Express API and store the returned JWT.
 * See client/src/api/client.js and server/src/routes/auth.routes.js.
 * ------------------------------------------------------------------ */
export default function AuthModal({ open, mode = 'signin', onClose }) {
  const { t, signIn, signUp } = useApp()
  const navigate = useNavigate()
  const [tab, setTab] = useState(mode)
  const [form, setForm] = useState({ email: '', password: '', businessName: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const firstField = useRef(null)

  useEffect(() => setTab(mode), [mode, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    firstField.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const isUp = tab === 'signup'

  const submit = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      setErr(t.lead.required)
      return
    }
    if (isUp && !form.businessName.trim()) {
      setErr(t.lead.required)
      return
    }

    setErr('')
    setBusy(true)
    try {
      if (isUp) {
        await signUp({
          email: form.email.trim(),
          password: form.password,
          businessName: form.businessName.trim(),
        })
      } else {
        await signIn({ email: form.email.trim(), password: form.password })
      }
      setForm({ email: '', password: '', businessName: '' })
      onClose()
      navigate('/account')
    } catch (e) {
      /* The API sends a readable sentence in `message`. */
      setErr(e.message)
    } finally {
      setBusy(false)
    }
  }

  /* Enter submits from any field. */
  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !busy) submit()
  }

  return (
    <div className="modal-scrim" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={isUp ? t.auth.signUpTitle : t.auth.signInTitle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__head">
          <h2>{isUp ? t.auth.signUpTitle : t.auth.signInTitle}</h2>
          <button className="icon-btn" onClick={onClose} aria-label={t.auth.close}>×</button>
        </div>
        <p className="modal__sub">{isUp ? t.auth.signUpSub : t.auth.signInSub}</p>

        {isUp && (
          <div className="field">
            <label htmlFor="au-biz">{t.auth.businessName}</label>
            <input
              id="au-biz"
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              onKeyDown={onKeyDown}
            />
          </div>
        )}

        <div className="field">
          <label htmlFor="au-email">{t.auth.email}</label>
          <input
            id="au-email"
            ref={firstField}
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onKeyDown={onKeyDown}
          />
        </div>

        <div className="field">
          <label htmlFor="au-pass">{t.auth.password}</label>
          <input
            id="au-pass"
            type="password"
            autoComplete={isUp ? 'new-password' : 'current-password'}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={onKeyDown}
          />
        </div>

        {err && <p className="field__err" style={{ marginBottom: 12 }}>{err}</p>}

        <button className="btn btn--primary btn--block" onClick={submit} disabled={busy}>
          {busy ? t.lead.sending : isUp ? t.auth.submitUp : t.auth.submitIn}
        </button>

        <button
          className="modal__toggle btn--block"
          onClick={() => {
            setErr('')
            setTab(isUp ? 'signin' : 'signup')
          }}
        >
          {isUp ? t.auth.toggleToIn : t.auth.toggleToUp}
        </button>

        <p className="modal__demo">{t.auth.demoNote}</p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { CONTACT } from '../data/content'
import { api } from '../api/client'

/* ------------------------------------------------------------------
 * LEAD CAPTURE
 * ------------------------------------------------------------------
 * Posts to POST /api/leads, which writes a Lead document in MongoDB
 * (server/src/models/Lead.js). Read them back as an admin with
 * GET /api/leads.
 * ------------------------------------------------------------------ */

export default function LeadForm() {
  const { t, selectedServices, clearServices } = useApp()
  const [values, setValues] = useState({
    name: '',
    business: '',
    type: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | done | error
  const [failMsg, setFailMsg] = useState('')

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: null }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = t.lead.required
    if (!values.business.trim()) next.business = t.lead.required
    if (!values.type) next.type = t.lead.required
    const digits = values.phone.replace(/\D/g, '')
    if (!digits) next.phone = t.lead.required
    else if (digits.length < 10) next.phone = t.lead.badPhone
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setState('sending')
    setFailMsg('')
    try {
      await api.createLead({ ...values, selectedServices, source: 'website' })
      clearServices()
      setState('done')
    } catch (e) {
      setFailMsg(e.message)
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="form-done">
        <div className="form-done__mark" aria-hidden="true">✓</div>
        <h3 style={{ fontSize: '19px' }}>{t.lead.done}</h3>
        <p style={{ marginTop: 10, color: 'var(--ink-2)', fontSize: '14.5px' }}>
          {CONTACT.phoneDisplay}
        </p>
      </div>
    )
  }

  return (
    <div className="form-card">
      <div className="form-head">
        <h3>{t.lead.formTitle}</h3>
        <p>{t.lead.formSub}</p>
      </div>

      {selectedServices.length > 0 && (
        <div className="lead-picks">
          <div className="lead-picks__label">{t.what.pickCount(selectedServices.length)}</div>
          <div className="lead-picks__chips">
            {selectedServices.map((s) => (
              <span className="lead-picks__chip" key={s}>{s}</span>
            ))}
          </div>
        </div>
      )}

      <div className="row-2">
        <div className={`field${errors.name ? ' field--bad' : ''}`}>
          <label htmlFor="lf-name">{t.lead.name}</label>
          <input id="lf-name" value={values.name} onChange={set('name')} autoComplete="name" />
          {errors.name && <span className="field__err">{errors.name}</span>}
        </div>

        <div className={`field${errors.business ? ' field--bad' : ''}`}>
          <label htmlFor="lf-biz">{t.lead.business}</label>
          <input id="lf-biz" value={values.business} onChange={set('business')} autoComplete="organization" />
          {errors.business && <span className="field__err">{errors.business}</span>}
        </div>
      </div>

      <div className="row-2">
        <div className={`field${errors.type ? ' field--bad' : ''}`}>
          <label htmlFor="lf-type">{t.lead.type}</label>
          <select id="lf-type" value={values.type} onChange={set('type')}>
            <option value="">—</option>
            {t.lead.types.map((ty) => (
              <option key={ty} value={ty}>{ty}</option>
            ))}
          </select>
          {errors.type && <span className="field__err">{errors.type}</span>}
        </div>

        <div className={`field${errors.phone ? ' field--bad' : ''}`}>
          <label htmlFor="lf-phone">{t.lead.phone}</label>
          <input id="lf-phone" value={values.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
          {errors.phone && <span className="field__err">{errors.phone}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="lf-msg">
          {t.lead.message} <span style={{ color: 'var(--ink-3)', fontWeight: 500 }}>· {t.lead.optional}</span>
        </label>
        <textarea id="lf-msg" value={values.message} onChange={set('message')} />
      </div>

      {state === 'error' && (
        <p className="field__err" style={{ marginBottom: 12 }}>{failMsg || t.lead.error}</p>
      )}

      <button
        className="btn btn--primary btn--block"
        onClick={handleSubmit}
        disabled={state === 'sending'}
      >
        {state === 'sending' ? t.lead.sending : t.lead.submit}
      </button>

      <p className="form-foot">{t.lead.privacy}</p>
    </div>
  )
}

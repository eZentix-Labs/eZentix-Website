import { Link, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CONTACT } from '../data/content'
import { rupee } from '../data/pricing'

const fmtDate = (iso, lang) => {
  const d = new Date(iso)
  const locale = lang === 'bn' ? 'bn-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN'
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
}

const daysBetween = (a, b) => Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000))

export default function Portal() {
  const { t, user, account, authLoading, lang } = useApp()

  /* Restoring a session from a saved token — hold the redirect until
     we know whether the token is still good. */
  if (authLoading) {
    return (
      <div className="portal">
        <div className="wrap portal__head">
          <p>…</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/" replace />

  /* Signed in, but GET /api/account has not landed yet (or failed). */
  if (!account) {
    return (
      <div className="portal">
        <div className="wrap portal__head">
          <h1>
            {t.portal.greeting}, {user.businessName}
          </h1>
          <p>{t.portal.subtitle}</p>
        </div>
      </div>
    )
  }

  const today = new Date()
  const total = daysBetween(account.startedOn, account.renewsOn) || 1
  const left = daysBetween(today, account.renewsOn)
  const used = Math.min(100, Math.max(0, ((total - left) / total) * 100))
  const expiringSoon = left <= 10

  return (
    <div className="portal">
      <div className="wrap portal__head">
        <h1>
          {t.portal.greeting}, {user.businessName}
        </h1>
        <p>{t.portal.subtitle}</p>
      </div>

      <div className="wrap portal__grid">
        {/* -------- main column -------- */}
        <div>
          {/* POS launch — the thing they came here to click */}
          <div className="pos-launch">
            <div>
              <h2>{t.portal.openPos}</h2>
              <p>{t.portal.openPosSub}</p>
            </div>
            <a
              className="btn btn--onpurple"
              href={account.posUrl || CONTACT.posUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.portal.openPos} →
            </a>
          </div>

          {/* Current subscription */}
          <section className="card">
            <div className="card__h">
              <h2>{t.portal.currentPurchase}</h2>
              <span className={`pill ${expiringSoon ? 'pill--warn' : 'pill--ok'}`}>
                {t.portal.active}
              </span>
            </div>

            <div className="kv">
              <div>
                <div className="kv__k">{t.portal.plan}</div>
                <div className="kv__v">{account.planName}</div>
              </div>
              <div>
                <div className="kv__k">{t.portal.amount}</div>
                <div className="kv__v kv__v--mono">{rupee(account.amount)}</div>
              </div>
              <div>
                <div className="kv__k">{t.portal.startedOn}</div>
                <div className="kv__v">{fmtDate(account.startedOn, lang)}</div>
              </div>
              <div>
                <div className="kv__k">{t.portal.renewsOn}</div>
                <div className="kv__v">{fmtDate(account.renewsOn, lang)}</div>
              </div>
            </div>

            <div className="meter" aria-hidden="true">
              <div className="meter__fill" style={{ width: `${used}%` }} />
            </div>
            <p style={{ marginTop: 8, fontSize: '13px', color: 'var(--ink-3)' }}>
              <span className="mono">{left}</span> {t.portal.daysLeft}
            </p>
          </section>

          {/* What you opted for */}
          <section className="card">
            <div className="card__h">
              <h2>{t.portal.opted}</h2>
            </div>
            <div className="opted">
              {account.optedServices.map((s) => (
                <div className="opted__row" key={s}>
                  <span className="tick" aria-hidden="true">✓</span>
                  {s}
                </div>
              ))}
            </div>

            {account.addOns?.length > 0 && (
              <>
                <div className="card__h" style={{ marginTop: 22, marginBottom: 12 }}>
                  <h2 style={{ fontSize: '14px' }}>{t.portal.addOnsHeld}</h2>
                </div>
                <div className="opted">
                  {account.addOns.map((a) => (
                    <div className="opted__row" key={a.name}>
                      <span className="tick" aria-hidden="true">✓</span>
                      {a.name}
                      <span className="mono" style={{ marginLeft: 'auto', color: 'var(--ink-3)' }}>
                        {rupee(a.price)}/{a.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* Invoices */}
          <section className="card">
            <div className="card__h">
              <h2>{t.portal.invoices}</h2>
            </div>

            {account.invoices?.length ? (
              <table className="table-lite">
                <thead>
                  <tr>
                    <th>{t.portal.invoiceNo}</th>
                    <th>{t.portal.date}</th>
                    <th>{t.portal.amount}</th>
                    <th>{t.portal.status}</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {account.invoices.map((inv) => (
                    <tr key={inv.no}>
                      <td className="mono">{inv.no}</td>
                      <td>{fmtDate(inv.date, lang)}</td>
                      <td className="mono">{rupee(inv.amount)}</td>
                      <td>
                        <span className={`pill ${inv.status === 'paid' ? 'pill--ok' : 'pill--warn'}`}>
                          {inv.status === 'paid' ? t.portal.paid : t.portal.pending}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {/* TODO(dev): point at your invoice PDF endpoint */}
                        <a href="#" style={{ color: 'var(--purple)', fontWeight: 700, fontSize: '13px' }}>
                          {t.portal.download}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty">{t.portal.noInvoices}</p>
            )}
          </section>
        </div>

        {/* -------- side column -------- */}
        <aside>
          <section className="card">
            <div className="card__h">
              <h2>{t.portal.quickLinks}</h2>
            </div>
            <div className="quick">
              <a href={account.posUrl || CONTACT.posUrl} target="_blank" rel="noopener noreferrer">
                Zen OS <span aria-hidden="true">↗</span>
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp <span aria-hidden="true">↗</span>
              </a>
              <a href={`mailto:${CONTACT.support}`}>
                {t.contact.supportLabel} <span aria-hidden="true">↗</span>
              </a>
              <Link to="/">
                {t.portal.backToSite} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>

          <section className="card">
            <div className="card__h">
              <h2>{t.portal.support}</h2>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)' }}>{t.portal.supportBody}</p>
            <a
              className="btn btn--primary btn--block"
              style={{ marginTop: 16 }}
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.portal.raiseRequest}
            </a>
          </section>
        </aside>
      </div>
    </div>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { LANGUAGES } from '../data/content'
import Logo from './Logo'
import Sound from './Sound'

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

export default function TopBar({ onSignIn }) {
  const { t, lang, setLang, theme, toggleTheme, user, signOut } = useApp()
  const navigate = useNavigate()

  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <Link to="/" className="logo" aria-label={t.brand}>
          <span className="logo__mark" aria-hidden="true">
            <Logo />
          </span>
          <span className="logo__name">{t.brand}</span>
        </Link>

        <div className="topbar__tools">
          {/* Location lives up here rather than in the hero, so it reads as
              a fact about the company and not as a headline. */}
          <span className="topbar__loc">
            <span className="topbar__loc-dot" aria-hidden="true" />
            {t.location}
          </span>

          <div className="segmented" role="group" aria-label={t.nav.language}>
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
                title={l.name}
              >
                {l.label}
              </button>
            ))}
          </div>

          <Sound />

          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={t.nav.theme}
            title={t.nav.theme}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          {user ? (
            <>
              <button className="btn btn--ghost btn--sm" onClick={() => navigate('/account')}>
                {t.nav.portal}
              </button>
              <button className="btn btn--sm" onClick={signOut} style={{ color: 'var(--ink-3)' }}>
                {t.nav.signOut}
              </button>
            </>
          ) : (
            <button className="btn btn--primary btn--sm" onClick={onSignIn}>
              {t.nav.signIn}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

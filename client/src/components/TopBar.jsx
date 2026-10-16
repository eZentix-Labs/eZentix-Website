import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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

function MenuIcon({ open }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  )
}

export default function TopBar({ onSignIn }) {
  const { t, lang, setLang, theme, toggleTheme, user, signOut } = useApp()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  /* Section anchors only exist on the home page. From the portal the same
     label has to walk back to / first, so it becomes a root-relative href.
     These are the crawlable internal links into each section — without them
     the header offers a search engine nothing to follow. */
  const onHome = pathname === '/'
  const sectionHref = (hash) => (onHome ? hash : `/${hash}`)

  /* Below 1080px the section links fold into a menu. On phones the
     language switch and Sign in move into it as well, so the bar itself
     has room for the brand name and stays one tidy row. */
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    const onDown = (e) => !headerRef.current?.contains(e.target) && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [menuOpen])

  const langSwitch = (
    <div className="segmented topbar__lang" role="group" aria-label={t.nav.language}>
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
  )

  const authButtons = (
    <div className="topbar__auth">
      {user ? (
        <>
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => {
              closeMenu()
              navigate('/account')
            }}
          >
            {t.nav.portal}
          </button>
          <button className="btn btn--sm" onClick={signOut} style={{ color: 'var(--ink-3)' }}>
            {t.nav.signOut}
          </button>
        </>
      ) : (
        <button
          className="btn btn--primary btn--sm"
          onClick={() => {
            closeMenu()
            onSignIn()
          }}
        >
          {t.nav.signIn}
        </button>
      )}
    </div>
  )

  return (
    <header className="topbar" ref={headerRef}>
      <div className="wrap topbar__inner">
        <Link to="/" className="logo" aria-label={t.brand}>
          <span className="logo__mark" aria-hidden="true">
            <Logo />
          </span>
          <span className="logo__name">{t.brand}</span>
        </Link>

        <nav className="topbar__nav" aria-label={t.nav.sections}>
          {t.footer.links.map((l) => (
            <a key={l.href} href={sectionHref(l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="topbar__tools">
          {/* Location lives up here rather than in the hero, so it reads as
              a fact about the company and not as a headline. */}
          <span className="topbar__loc">
            <span className="topbar__loc-dot" aria-hidden="true" />
            {t.location}
          </span>

          {langSwitch}

          <Sound />

          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={t.nav.theme}
            title={t.nav.theme}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          {authButtons}

          <button
            className="icon-btn topbar__menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={t.nav.menu}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div id="site-menu" className="topbar__menu" hidden={!menuOpen}>
        <div className="wrap">
          <nav className="topbar__menu-links" aria-label={t.nav.sections}>
            {t.footer.links.map((l) => (
              <a key={l.href} href={sectionHref(l.href)} onClick={closeMenu}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="topbar__menu-tools">
            {langSwitch}
            {authButtons}
          </div>
        </div>
      </div>
    </header>
  )
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { content } from '../data/content'
import { api, tokenStore } from '../api/client'

const AppContext = createContext(null)

/* localStorage is wrapped so the site still works if it is blocked. */
const store = {
  get(key, fallback) {
    try {
      const v = window.localStorage.getItem(key)
      return v === null ? fallback : v
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      /* ignore */
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
  },
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => store.get('cb.theme', 'light'))
  const [lang, setLang] = useState(() => store.get('cb.lang', 'en'))

  /* `user` is identity (who is signed in). `account` is the portal
     payload from GET /api/account — plan, invoices, add-ons. They are
     separate because identity is cheap to restore from a token while
     the account is a real database read. */
  const [user, setUser] = useState(null)
  const [account, setAccount] = useState(null)
  const [authLoading, setAuthLoading] = useState(() => Boolean(tokenStore.get()))

  /* Service picker — the checkbox "cart" on the offerings section.
     No pricing attached; this just carries the visitor's picks through
     to the lead form so we know what to talk to them about. */
  const [selectedServices, setSelectedServices] = useState([])
  const toggleService = (item) =>
    setSelectedServices((cur) =>
      cur.includes(item) ? cur.filter((x) => x !== item) : [...cur, item],
    )
  const clearServices = () => setSelectedServices([])

  /* Sound preference. Defaults to on; once a visitor mutes it the choice
     sticks across visits. */
  const [soundOn, setSoundOnState] = useState(() => store.get('cb.sound', 'on') !== 'off')
  const setSoundOn = (on) => {
    setSoundOnState(on)
    store.set('cb.sound', on ? 'on' : 'off')
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    store.set('cb.theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang)
    document.documentElement.setAttribute('lang', lang)
    store.set('cb.lang', lang)
  }, [lang])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  /* ----------------------------------------------------------------
   * AUTH — talks to the Express API (server/src/controllers/authController.js)
   * ---------------------------------------------------------------- */

  const refreshAccount = useCallback(async () => {
    const data = await api.account()
    setAccount(data)
    return data
  }, [])

  /* On first load: if a token survived from last visit, prove it is
     still good and pull the account back down. */
  useEffect(() => {
    if (!tokenStore.get()) return
    let cancelled = false

    ;(async () => {
      try {
        const { user: me } = await api.me()
        const data = await api.account()
        if (cancelled) return
        setUser(me)
        setAccount(data)
      } catch {
        if (cancelled) return
        tokenStore.clear() /* expired or revoked — start clean */
        setUser(null)
        setAccount(null)
      } finally {
        if (!cancelled) setAuthLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const afterAuth = async ({ token, user: nextUser }) => {
    tokenStore.set(token)
    setUser(nextUser)
    try {
      setAccount(await api.account())
    } catch {
      setAccount(null) /* portal will show the empty state */
    }
    return nextUser
  }

  const signIn = async ({ email, password }) => afterAuth(await api.login({ email, password }))

  const signUp = async ({ email, password, businessName }) =>
    afterAuth(await api.register({ email, password, businessName }))

  const signOut = () => {
    tokenStore.clear()
    setUser(null)
    setAccount(null)
  }

  const t = content[lang] || content.en

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      lang,
      setLang,
      t,
      user,
      account,
      authLoading,
      signIn,
      signUp,
      signOut,
      refreshAccount,
      selectedServices,
      toggleService,
      clearServices,
      soundOn,
      setSoundOn,
    }),
    [theme, lang, user, account, authLoading, t, selectedServices, soundOn, refreshAccount],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

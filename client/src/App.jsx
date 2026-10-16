import { useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar'
import AuthModal from './components/AuthModal'
import Home from './pages/Home'
import Seo from './components/Seo'
import useScrollReveal from './hooks/useScrollReveal'

/* The portal is behind a sign-in and nobody arriving from a search result
   will ever see it. Splitting it into its own chunk keeps its code off the
   critical path for the one page that actually has to rank. */
const Portal = lazy(() => import('./pages/Portal'))

export default function App() {
  const [auth, setAuth] = useState({ open: false, mode: 'signin' })
  const { pathname } = useLocation()

  // Re-arm the reveal-on-scroll observer whenever the route changes —
  // Home and Portal mount a different set of .head/.pillar/.plan etc.
  useScrollReveal([pathname])

  const openSignIn = () => setAuth({ open: true, mode: 'signin' })
  const closeAuth = () => setAuth((a) => ({ ...a, open: false }))

  return (
    <>
      <TopBar onSignIn={openSignIn} />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Signed-in only, so it carries a noindex instead of a canonical.
              The authoritative rule is the X-Robots-Tag header in vercel.json —
              this one only covers client-side navigation. See src/seo/site.js. */}
          <Route
            path="/account"
            element={
              <>
                <Seo title="Your account — eZentix Labs" />
                <Portal />
              </>
            }
          />
        </Routes>
      </Suspense>

      <AuthModal open={auth.open} mode={auth.mode} onClose={closeAuth} />
    </>
  )
}

import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar'
import AuthModal from './components/AuthModal'
import Home from './pages/Home'
import Portal from './pages/Portal'
import useScrollReveal from './hooks/useScrollReveal'

export default function App() {
  const [auth, setAuth] = useState({ open: false, mode: 'signin' })
  const { pathname } = useLocation()

  // Re-arm the reveal-on-scroll observer whenever the route changes —
  // Home and Portal mount a different set of .head/.pillar/.plan etc.
  useScrollReveal([pathname])

  const openSignIn = () => setAuth({ open: true, mode: 'signin' })
  const closeAuth = () => setAuth((a) => ({ ...a, open: false }))

  /* Clicking a plan on the pricing table opens sign-up.
     Swap this for your checkout flow when payments go live. */
  const onChoosePlan = (tier) => {
    console.info('[plan selected]', tier.id)
    setAuth({ open: true, mode: 'signup' })
  }

  return (
    <>
      <TopBar onSignIn={openSignIn} />

      <Routes>
        <Route path="/" element={<Home onChoosePlan={onChoosePlan} />} />
        <Route path="/account" element={<Portal />} />
      </Routes>

      <AuthModal open={auth.open} mode={auth.mode} onClose={closeAuth} />
    </>
  )
}

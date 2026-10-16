import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider, matchesPrerender } from './context/AppContext'
import App from './App'
import './styles/index.css'

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
)

/* The production index.html ships the home page already rendered
   (tools/prerender.mjs). Hydrating keeps that markup instead of repainting
   it, which is what makes the prerender count for LCP. A visitor who saved
   another language or theme, any other route (/account is rewritten to the
   same file) and the dev server (empty #root) get a fresh client render
   instead, since their first render would not match the markup. */
if (root.hasChildNodes() && window.location.pathname === '/' && matchesPrerender()) {
  ReactDOM.hydrateRoot(root, app)
} else {
  ReactDOM.createRoot(root).render(app)
}

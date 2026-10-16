import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppProvider } from './context/AppContext'
import App from './App'

/*
 * Build-time only. tools/prerender.mjs calls this once per indexable route
 * and writes the result into dist/index.html, so crawlers get the real copy
 * on the first pass instead of an empty <div id="root">. main.jsx then
 * hydrates that markup rather than rendering from scratch.
 */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AppProvider>
        <App />
      </AppProvider>
    </StaticRouter>,
  )
}

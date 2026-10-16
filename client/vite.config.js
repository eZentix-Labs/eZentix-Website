import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ORIGIN } from './src/seo/site.js'
import { renderPageHead } from './src/seo/head.js'

/* Emit route metadata and linked business/service JSON-LD in static HTML.
   The postbuild step applies the same metadata function to /account. */
const injectOrigin = () => ({
  name: 'inject-origin',
  /* 'pre' so the URLs are real before Vite parses the HTML: it decodes every
     href, and a bare % is not a valid URI. */
  transformIndexHtml: { order: 'pre', handler: (html) =>
      renderPageHead(html.replaceAll('%ORIGIN%', ORIGIN), '/'),
  },
})

export default defineConfig({
  plugins: [react(), injectOrigin()],
  server: {
    port: 5173,
    /* Anything the app fetches under /api goes to the Express server,
       so the browser sees one origin and there is no CORS dance in
       development. */
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})

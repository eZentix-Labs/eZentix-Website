import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ORIGIN } from './src/seo/site.js'
import { SOCIAL } from './src/data/content.js'

/* index.html carries the canonical, Open Graph and JSON-LD URLs statically
   so crawlers see them without JavaScript. They are written as %ORIGIN% and
   filled in here, so src/seo/site.js stays the only place the domain lives.
   %SAME_AS% likewise comes from the SOCIAL list in src/data/content.js. */
const injectOrigin = () => ({
  name: 'inject-origin',
  /* 'pre' so the URLs are real before Vite parses the HTML: it decodes every
     href, and a bare % is not a valid URI. */
  transformIndexHtml: { order: 'pre', handler: (html) =>
      html
        .replaceAll('%ORIGIN%', ORIGIN)
        .replaceAll('%SAME_AS%', JSON.stringify(SOCIAL.map((s) => s.href))),
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

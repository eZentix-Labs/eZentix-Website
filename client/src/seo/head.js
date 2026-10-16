import { PAGE_SEO, ROUTES, OG_IMAGE, abs } from './site.js'
import { HOME_SCHEMA } from './schema.js'

const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

// Used for both Vite's homepage and the separate account HTML document.
export function renderPageHead(html, path) {
  const page = PAGE_SEO[path]
  const indexable = ROUTES.find((r) => r.path === path)?.indexable
  html = html.replace(/<title>[^]*?<\/title>/, `<title>${escape(page.title)}</title>`)
  const meta = (key, value) => {
    const attr = key.startsWith('og:') ? 'property' : 'name'
    const tag = `<meta ${attr}="${key}" content="${escape(value)}" />`
    const pattern = new RegExp(`<meta ${attr}="${key}"[^>]*>`)
    html = pattern.test(html) ? html.replace(pattern, () => tag) : html.replace('</head>', `${tag}\n</head>`)
  }
  meta('description', page.description)
  meta('robots', indexable ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex')
  for (const prefix of ['og', 'twitter']) {
    meta(`${prefix}:title`, page.title)
    meta(`${prefix}:description`, page.description)
    meta(`${prefix}:image`, OG_IMAGE)
  }
  meta('og:url', abs(path))
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${abs(path)}" />`)
  html = html.replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[^]*?<\/script>/g, '')
  if (indexable) {
    const json = JSON.stringify(HOME_SCHEMA).replaceAll('<', '\\u003c')
    html = html.replace('</head>', `<script id="page-schema" type="application/ld+json">${json}</script>\n</head>`)
  }
  return html
}

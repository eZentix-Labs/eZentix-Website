import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PAGE_SEO, ROUTES, OG_IMAGE, abs } from '../seo/site'
import { HOME_SCHEMA } from '../seo/schema'

const upsertMeta = (key, value) => {
  const attr = key.startsWith('og:') ? 'property' : 'name'
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

// The build emits these same values statically. Keep them in sync when
// navigating between the public homepage and the private customer portal.
export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const page = PAGE_SEO[path] || PAGE_SEO['/account']
    const indexable = ROUTES.find((r) => r.path === path)?.indexable
    document.title = page.title
    upsertMeta('description', page.description)
    upsertMeta('robots', indexable
      ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      : 'noindex')
    for (const prefix of ['og', 'twitter']) {
      upsertMeta(`${prefix}:title`, page.title)
      upsertMeta(`${prefix}:description`, page.description)
      upsertMeta(`${prefix}:image`, OG_IMAGE)
    }
    upsertMeta('og:url', abs(path))
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = abs(path)
    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove())
    if (indexable) {
      const schema = document.createElement('script')
      schema.id = 'page-schema'
      schema.type = 'application/ld+json'
      schema.textContent = JSON.stringify(HOME_SCHEMA)
      document.head.appendChild(schema)
    }
  }, [pathname])
  return null
}

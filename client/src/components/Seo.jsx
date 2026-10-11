import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ORIGIN, ROUTES, abs } from '../seo/site'

/*
 * Keeps <title>, the meta description, the canonical link and the robots
 * directive in step with the current route.
 *
 * index.html already ships the home page's head statically — that is the copy
 * crawlers see before any JavaScript runs, and it is the one that matters for
 * ranking. This component exists for the client-side navigations that happen
 * afterwards, chiefly so /account is never indexed and never leaks a canonical
 * pointing at the home page.
 */

const upsertMeta = (selector, attrs) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
  return el
}

const upsertCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({ title, description }) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (title) document.title = title
    if (description) {
      upsertMeta('meta[name="description"]', { name: 'description', content: description })
      upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    }

    /* Strip the query string and any trailing slash noise: a canonical must
       name exactly one URL per page, and ?utm_source=... is still this page. */
    const route = ROUTES.find((r) => r.path === pathname)
    const canonical = route ? abs(route.path) : `${ORIGIN}${pathname}`
    upsertCanonical(canonical)

    if (title) {
      upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
      upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    }

    const indexable = route ? route.indexable : false
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: indexable
        ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        : 'noindex, nofollow',
    })
  }, [pathname, title, description])

  return null
}

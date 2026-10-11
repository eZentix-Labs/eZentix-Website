/*
 * One source of truth for every absolute URL the site emits — canonical
 * tags, Open Graph, JSON-LD, and the sitemap generator all read from here.
 * Change the origin in this file and nothing else.
 *
 * ORIGIN is the apex, without a trailing slash. Vercel is configured to
 * 308 www.ezentixlabs.com -> ezentixlabs.com, so the apex is the only
 * form that should ever appear in a canonical tag.
 */
export const ORIGIN = 'https://ezentixlabs.com'

export const BRAND = 'eZentix Labs'

/* Absolute URL for a site-relative path. */
export const abs = (path = '/') => `${ORIGIN}${path.startsWith('/') ? path : `/${path}`}`

export const OG_IMAGE = abs('/og-image.jpg')

/*
 * Every route the app serves, and how each should be treated by crawlers.
 * `indexable: false` routes are excluded from the sitemap and get a
 * robots noindex tag at runtime — /account is a signed-in-only portal and
 * has nothing a searcher could use.
 */
export const ROUTES = [
  {
    path: '/',
    indexable: true,
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/account',
    indexable: false,
  },
]

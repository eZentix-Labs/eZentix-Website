/*
 * One source of truth for every absolute URL the site emits — canonical
 * tags, Open Graph, JSON-LD, and the sitemap generator all read from here.
 * Change the origin in this file and nothing else: index.html uses a
 * %ORIGIN% token that vite.config.js fills in from here.
 *
 * ORIGIN is the host Vercel actually serves, without a trailing slash.
 * The live project 308s ezentix.com -> www.ezentix.com, so www is the
 * only form that should ever appear in a canonical tag. If you flip the
 * primary domain in the Vercel dashboard, flip it here too: a canonical
 * that points at a redirect, or at a domain that does not resolve, is
 * the fastest way to keep a site out of Google.
 */
export const ORIGIN = 'https://www.ezentix.com'

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

// Shared by static HTML generation and client-side navigation.
export const PAGE_SEO = {
  '/': {
    title: 'Software Company in Budbud — Zen OS POS & eZentix Labs',
    description: 'Discover billing software, restaurant POS and website development in Budbud with eZentix Labs. Built for local businesses in West Bengal. Book a demo.',
  },
  '/account': {
    title: 'Your eZentix Labs Account — Subscriptions & Support',
    description: 'Sign in to your eZentix Labs account to view your subscription, check invoices, access Zen OS and contact support for help running your business.',
  },
}
export const HOME_H1 = 'Business software and websites for businesses in Budbud'

import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'
import { PAGE_SEO, HOME_H1, abs } from '../src/seo/site.js'
import { content, CONTACT, SOCIAL } from '../src/data/content.js'
import { imageVariants } from '../src/data/image-variants.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = (file) => readFileSync(resolve(root, file), 'utf8')
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;')
const home = read('dist/index.html')
const account = read('dist/account.html')
for (const [path, html] of [['/', home], ['/account', account]]) {
  const head = html.split('</head>')[0]
  const page = PAGE_SEO[path]
  assert.equal((head.match(/<title>/g) || []).length, 1)
  assert(head.includes(`<title>${escape(page.title)}</title>`))
  assert(page.description.length >= 140 && page.description.length <= 160)
  assert(head.includes(`<meta name="description" content="${escape(page.description)}"`))
  assert(head.includes(`<link rel="canonical" href="${abs(path)}"`))
  for (const prefix of ['og', 'twitter']) {
    const attr = prefix === 'og' ? 'property' : 'name'
    assert(head.includes(`<meta ${attr}="${prefix}:title" content="${escape(page.title)}"`))
    assert(head.includes(`<meta ${attr}="${prefix}:description" content="${escape(page.description)}"`))
  }
  assert(!/%(?:ORIGIN|SAME_AS)%/.test(html))
  assert(html.includes('lang="en"') && head.includes('name="viewport"'))
}
assert.equal((home.match(/<h1[ >]/g) || []).length, 1)
assert(home.includes(`<h1>${HOME_H1}</h1>`))
assert(home.includes('class="hero__tagline"'))
for (const item of content.en.work.items) {
  assert(home.includes(escape(item.problem)), 'Case-study problem must be prerendered')
  assert(home.includes(escape(item.solution)), 'Case-study solution must be prerendered')
}
const graph = JSON.parse(home.match(/<script[^>]*type="application\/ld\+json"[^>]*>([^]*?)<\/script>/)[1])['@graph']
const business = graph.find((n) => Array.isArray(n['@type']) && n['@type'].includes('LocalBusiness'))
assert(business['@type'].includes('Organization'))
assert.equal(business.address.addressLocality, 'Budbud')
assert.equal(business.telephone, CONTACT.phone)
assert.deepEqual(business.sameAs, SOCIAL.map((s) => s.href))
assert.equal(graph.filter((n) => n['@type'] === 'Service').length, 5)
for (const node of graph.filter((n) => n['@type'] === 'Service')) {
  assert(home.includes(`id="${new URL(node.url).hash.slice(1)}"`))
}
assert(!account.includes('application/ld+json'), 'Private route must not ship homepage schema')
assert(account.includes('name="robots" content="noindex"'))
assert(account.includes('<div id="root"></div>'), 'Private route must not ship homepage body')
assert(!read('public/robots.txt').includes('Disallow: /account'))
assert(!read('public/sitemap.xml').includes('/account'))
assert(!read('public/sitemap.xml').includes('<lastmod>'))
const before = read('public/sitemap.xml')
execFileSync(process.execPath, ['tools/gen-sitemap.mjs'], { cwd: root })
assert.equal(read('public/sitemap.xml'), before, 'Sitemap must be stable across builds')
const config = JSON.parse(read('vercel.json'))
assert(config.headers.find((r) => r.source === '/account').headers.some((h) => h.key === 'X-Robots-Tag' && h.value === 'noindex'))
assert(!config.rewrites?.some((r) => r.source === '/account' && r.destination === '/'))
const icon = await sharp(resolve(root, 'public/apple-touch-icon.png')).metadata()
assert(icon.format === 'png' && icon.width === 180 && icon.height === 180)
for (const variant of Object.values(imageVariants)) {
  for (const candidate of variant.srcSet.split(', ')) {
    const [url, width] = candidate.split(' ')
    const image = resolve(root, `public${url}`)
    assert(existsSync(image))
    assert.equal((await sharp(image).metadata()).width, Number.parseInt(width))
    assert(existsSync(resolve(root, `dist${url}`)), 'Responsive asset must be deployed')
  }
}
for (const [, href] of home.matchAll(/href="#([^"]+)"/g)) assert(home.includes(`id="${href}"`))
console.log('PASS: both route heads, prerendered H1/case studies, schemas, crawl rules, stable sitemap, icon, responsive assets and internal anchors.')

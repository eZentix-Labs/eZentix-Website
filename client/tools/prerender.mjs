#!/usr/bin/env node
/*
 * Renders the home page to static HTML and writes it into dist/index.html.
 *
 * Runs automatically after `npm run build` via the postbuild script. It
 * reuses the client build's index.html (hashed asset links, SEO head) and
 * fills the homepage root and emits a separate account shell. The output
 * remains a plain static site.
 *
 * Only `/` is prerendered: it is the one indexable route in src/seo/site.js.
 * /account gets a separate noindex HTML shell and stays client-rendered.
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { build } from 'vite'
import { renderPageHead } from '../src/seo/head.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(ROOT, 'dist')
/* Inside node_modules so bare imports (react, react-router-dom) still resolve
   from the bundle, and so it never shows up as a stray folder in the repo. */
const SSR_OUT = resolve(ROOT, 'node_modules', '.prerender')

await build({
  root: ROOT,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.jsx', outDir: SSR_OUT, emptyOutDir: true, copyPublicDir: false },
})

const { render } = await import(pathToFileURL(resolve(SSR_OUT, 'entry-server.js')).href)

const indexPath = resolve(DIST, 'index.html')
const template = readFileSync(indexPath, 'utf8')
const EMPTY_ROOT = '<div id="root"></div>'
if (!template.includes(EMPTY_ROOT)) throw new Error('[prerender] no empty #root in dist/index.html')

// Account has its own head and an empty client-rendered root. It never ships
// the homepage's body, canonical or structured data. Vercel cleanUrls serves it.
writeFileSync(resolve(DIST, 'account.html'), renderPageHead(template, '/account'))

const appHtml = render('/')
writeFileSync(indexPath, template.replace(EMPTY_ROOT, `<div id="root">${appHtml}</div>`))
/* Retries: Windows can briefly hold a lock on the module just imported. */
rmSync(SSR_OUT, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })

console.log(`[prerender] wrote / into dist/index.html (${(appHtml.length / 1024).toFixed(1)} KB of HTML)`)

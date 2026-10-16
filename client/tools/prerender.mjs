#!/usr/bin/env node
/*
 * Renders the home page to static HTML and writes it into dist/index.html.
 *
 * Runs automatically after `npm run build` via the postbuild script. It
 * reuses the client build's index.html (hashed asset links, SEO head) and
 * only fills in <div id="root">, so the output is still a plain static site.
 *
 * Only `/` is prerendered: it is the one indexable route in src/seo/site.js.
 * /account is noindex and signed-in only, so it stays client-rendered.
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { build } from 'vite'

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

const appHtml = render('/')
writeFileSync(indexPath, template.replace(EMPTY_ROOT, `<div id="root">${appHtml}</div>`))
/* Retries: Windows can briefly hold a lock on the module just imported. */
rmSync(SSR_OUT, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })

console.log(`[prerender] wrote / into dist/index.html (${(appHtml.length / 1024).toFixed(1)} KB of HTML)`)

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { resolve, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync, brotliCompressSync } from 'node:zlib'

// Run after npm run build; measures the final prerendered output, not Vite's
// intermediate HTML. Compression sizes are estimates, excluding HTTP headers.
const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')
function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = resolve(dir, name)
    return statSync(path).isDirectory() ? files(path) : [path]
  })
}
const rows = files(dist).map((path) => {
  const data = readFileSync(path)
  return {
    file: relative(dist, path).replaceAll('\\', '/'),
    bytes: data.length,
    ...(/\.(?:html|css|js|svg)$/.test(path)
      ? { gzip: gzipSync(data).length, brotli: brotliCompressSync(data).length }
      : {}),
  }
}).sort((a, b) => b.bytes - a.bytes)
const images = rows.filter((r) => /\.(?:webp|jpg|png|svg|avif)$/.test(r.file))
console.log(JSON.stringify({
  totalBytes: rows.reduce((sum, r) => sum + r.bytes, 0),
  imageBytes: images.reduce((sum, r) => sum + r.bytes, 0),
  assets: rows,
}, null, 2))

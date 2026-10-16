# SEO implementation verification

- [x] Full root production build, including prebuild and postbuild, passed.
- [x] Homepage uses the exact requested title and one exact requested H1.
- [x] Homepage description is within 140-160 characters and includes billing software, restaurant POS, website development in Budbud and a demo CTA.
- [x] Existing tagline remains a visible H2 with the established font and brand color.
- [x] Account receives its own static HTML head, self-canonical, description, OG and Twitter tags, and noindex meta tag.
- [x] Account HTML contains neither homepage content nor homepage JSON-LD.
- [x] Vercel configuration serves X-Robots-Tag: noindex for /account; robots.txt allows crawling.
- [x] Account content uses main landmarks.
- [x] Case-study problem/solution text is present in the homepage HTML and revealed in the existing modal. Gallery images still mount only when opened.
- [x] Organization/LocalBusiness, WebSite, WebPage, SoftwareApplication and five Service nodes are linked and parse as JSON.
- [x] Address uses the confirmed locality/region/country and district in the location label. No street address, opening hours or unconfirmed postcode was invented.
- [x] Sitemap contains only the indexable homepage, omits lastmod and stays byte-identical on regeneration.
- [x] Apple touch icon is PNG, 180x180.
- [x] Sixteen 480px/800px work-image variants exist; srcset width descriptors match their measured pixel widths. Full originals remain available.
- [x] Homepage anchor targets exist; image variants are copied into dist.
- [x] git diff --check passed.

Commands: `npm.cmd run build` from the repository root; `npm.cmd run check:seo` from client. Use `npm.cmd run images` in client after changing source images.

## Deployment verification still required

The code and generated files are verified locally. Deployment, real browser interaction, production response headers, Google indexing and Core Web Vitals are not verified by these checks. Deploy with the client directory as the Vercel project root (matching client/vercel.json), run the complete npm build lifecycle, then check the /account noindex header and clean-URL serving. Submit the sitemap and inspect the homepage in Search Console. Validate schema and mobile performance on the deployed site. The business did not provide a street address; add one only if confirmed and appropriate for public use. FAQPage and BreadcrumbList are omitted because the current site does not contain corresponding FAQ content or a breadcrumb trail. Separate language URLs were outside this requested implementation.

## Complete changed-file manifest

Includes the earlier performance changes retained in this working tree. Build output under client/dist is ignored and is not a source change.

| File | Change |
|---|---|
| `client/index.html` | Updated source homepage metadata and PNG touch-icon link; removed obsolete keywords and redundant logo preload. |
| `client/package-lock.json` | Locked image-processing dependency and its platform packages. |
| `client/package.json` | Added Sharp and repeatable image-generation/SEO-validation commands. |
| `client/public/apple-touch-icon.png` | 180x180 PNG derived from the existing purple logo on white. |
| `client/public/robots.txt` | Allows account crawling so crawlers can observe noindex. |
| `client/public/sitemap.xml` | Lists only the homepage; removed build-date lastmod. |
| `client/public/work/hotel-khoai/cover-480w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/cover-800w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/inventory-480w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/inventory-800w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/invoices-480w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/invoices-800w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/menu-480w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/menu-800w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/orders-480w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/orders-800w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/restaurant-480w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/restaurant-800w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/staff-480w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/staff-800w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/table-map-480w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/public/work/hotel-khoai/table-map-800w.webp` | Generated responsive WebP thumbnail from the corresponding original; original retained. |
| `client/src/App.jsx` | Uses shared route SEO; retains earlier deferred sign-in loading and form-state preservation. |
| `client/src/components/Hero.jsx` | Uses the requested H1 and preserves the existing tagline as an H2. |
| `client/src/components/Seo.jsx` | Synchronizes title, description, canonical, robots, OG, Twitter and JSON-LD across navigation. |
| `client/src/components/Work.jsx` | Prerenders revealable modal problem/solution copy; adds responsive images and measured cover dimensions. |
| `client/src/components/ZenOS.jsx` | Earlier performance improvement: skips invisible floor-demo updates. |
| `client/src/data/image-variants.js` | Generated responsive image URLs, actual widths and heights. |
| `client/src/pages/Home.jsx` | Uses shared metadata instead of duplicated homepage strings. |
| `client/src/pages/Portal.jsx` | Uses main landmarks in loading and authenticated states. |
| `client/src/seo/head.js` | Generates route-specific static head tags; excludes homepage JSON-LD from account HTML. |
| `client/src/seo/schema.js` | Adds linked Organization/LocalBusiness, WebSite, WebPage, SoftwareApplication and five Service nodes using confirmed business facts. |
| `client/src/seo/site.js` | Centralizes both pages' metadata and the requested homepage H1. |
| `client/src/styles/index.css` | Preserves brand typography/color for the tagline beneath the new H1. |
| `client/tools/analyze-dist.mjs` | Earlier performance tool: measures final asset sizes and gzip/Brotli estimates. |
| `client/tools/check-seo.mjs` | Checks generated route metadata, schema, crawl rules, deterministic sitemap, image dimensions/files and anchors. |
| `client/tools/gen-sitemap.mjs` | Removes conflicting crawl block and unstable build-date lastmod. |
| `client/tools/prepare-images.mjs` | Reproducibly creates 480px/800px WebPs and the 180px PNG touch icon. |
| `client/tools/prerender.mjs` | Prerenders the homepage and writes a separate account.html shell. |
| `client/vercel.json` | Serves account.html through clean URLs, sets account noindex header and caches the touch icon. |
| `client/vite.config.js` | Uses the shared static metadata/schema generator during builds. |
| `reports/seo-verification.md` | Final validation checklist and complete changed-file manifest. |

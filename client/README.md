# Charubala LLP — website

Marketing site, lead capture, and a customer portal for Charubala LLP.
Built with React 18 + Vite.

This is the **front-end half** of a MERN app — the Express + MongoDB API
lives in `../server`. See the [root README](../README.md) to run both
together. Sign-in and the enquiry form need the API running.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173, proxies /api to :5000
npm run build      # outputs to dist/
npm run preview    # serve the built site locally
```

Set `VITE_API_URL` in `.env` only when the API is on a different host
(production). In development the Vite proxy handles it.

## Deploy

Push to GitHub, then point any static host at the repo.

- **Vercel / Netlify** — build command `npm run build`, publish directory `dist`
- **GitHub Pages** — serve `dist/` (add a `base` to `vite.config.js` if not on the domain root)

The site uses client-side routing, so the host must rewrite unknown paths
to `index.html`. `netlify.toml` and `vercel.json` in this repo already do that.

Point `charubalainc.com` at the host and set `pos.charubalainc.com` at the
Charu POS app.

---

## Where to change things

| What | File |
|---|---|
| **Prices, tier limits, feature lists** | `src/data/pricing.js` |
| **All copy, in all three languages** | `src/data/content.js` |
| Phone, WhatsApp, email, POS URL | `CONTACT` at the bottom of `src/data/content.js` |
| Colours, spacing, typography | `src/styles/index.css` (tokens at the top) |
| Section order on the homepage | `src/pages/Home.jsx` |

`pricing.js` is the single source of truth. No rupee figure is hardcoded
anywhere else — changing a price there changes it everywhere, including
the portal.

---

## What is real and what is a demo

**Real and ready:**
- Every section of the marketing site
- Three languages (English, Bengali, Hindi) with a live toggle
- Light and dark theme, remembered between visits
- Responsive down to small phones, keyboard focus states, reduced-motion respected
- Lead form with validation

**Demo only — needs a backend before launch:**

1. **Lead submission** — `submitLead()` in `src/components/LeadForm.jsx`
   currently logs to the console. Replace the function body with a POST to
   your endpoint. Keep the payload shape.

2. **Sign in / sign up** — `signIn()` in `src/context/AppContext.jsx` accepts
   any email and password and loads a sample account. There is no real
   authentication. Replace before anyone can see billing data.

3. **Portal data** — the portal reads from `demoAccount` in
   `src/context/AppContext.jsx`. Swap it for a fetch of the signed-in
   customer's real subscription. The object keys are what the portal
   expects; keep them.

4. **Invoice downloads** — the download links in `src/pages/Portal.jsx`
   are placeholders.

5. **Checkout** — clicking a plan opens the sign-up modal
   (`onChoosePlan` in `src/App.jsx`). Point it at your payment flow.

---

## Structure

```
src/
├── main.jsx                  entry
├── App.jsx                   routes + auth modal state
├── data/
│   ├── pricing.js            tiers, features, add-ons
│   └── content.js            all copy (en / bn / hi) + contact details
├── context/
│   └── AppContext.jsx        theme, language, demo auth, demo account
├── components/
│   ├── TopBar.jsx            logo, language toggle, theme toggle, sign in
│   ├── Hero.jsx
│   ├── Sections.jsx          who / what / how / why / founder
│   ├── CharuPOS.jsx          live floor map, features, pricing
│   ├── LeadForm.jsx
│   ├── Contact.jsx           contact block + footer
│   └── AuthModal.jsx
├── pages/
│   ├── Home.jsx
│   └── Portal.jsx            customer account view
└── styles/index.css
```

---

© 2026 Charubala LLP

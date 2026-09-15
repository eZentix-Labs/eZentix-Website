# Charubala LLP — MERN stack

The agency site, lead capture and customer portal, rebuilt as a full
MERN app: **M**ongoDB + **E**xpress + **R**eact + **N**ode.

```
Sohoj Softwares/
├─ client/          React 18 + Vite front-end (the website)
├─ server/          Express + Mongoose API
├─ .vscode/         VS Code launch configs, tasks, extension picks
├─ api.http         click-to-run API requests (REST Client extension)
└─ package.json     runs both halves with one command
```

---

## 1. Open it in VS Code

```bash
code "C:\Users\User\Desktop\Sohoj Softwares"
```

Open the **root** folder, not `client` or `server` on their own — the
launch configs, tasks and search settings are set up at the root.

VS Code will offer to install the recommended extensions (ESLint,
Prettier, React snippets, MongoDB, REST Client). Say yes.

---

## 2. Install everything

```bash
npm run install:all
```

Installs the root tooling, then `server/`, then `client/`.

---

## 3. Point it at a database

Copy `server/.env.example` to `server/.env` and set `MONGO_URI`. You
have three options:

| Option | `MONGO_URI` | Notes |
| --- | --- | --- |
| **No database installed** | leave as is | run `npm run dev:mem` instead — see below |
| **Local MongoDB** | `mongodb://127.0.0.1:27017/charubala` | install [MongoDB Community Server](https://www.mongodb.com/try/download/community) |
| **MongoDB Atlas** (free cloud) | `mongodb+srv://USER:PASS@cluster0.xxxx.mongodb.net/charubala` | from your Atlas cluster's *Connect* button |

Also set `JWT_SECRET` to any long random string.

---

## 4. Run it

```bash
npm run dev
```

- API → http://localhost:5000
- Website → http://localhost:5173

Both reload on save: nodemon restarts the API, Vite hot-reloads React.

**No MongoDB installed yet?** Use this instead — it boots its own
temporary mongod, seeds the demo account, and forgets everything when
you stop it:

```bash
npm run dev:mem
```

Good for getting the whole thing on screen in one command. Move to a
real MongoDB or an Atlas cluster as soon as you want your data to
survive a restart.

---

## 5. Seed the demo data

```bash
npm run seed
```

Creates two logins:

| Role | Email | Password |
| --- | --- | --- |
| Customer | `demo@charubala.com` | `demo1234` |
| Admin | `admin@charubala.com` | `admin1234` |

Sign in as the customer and you land on `/account` with a real Pro
subscription, add-on and three invoices — all read out of MongoDB.

---

## API

| Method | Route | Who | Does |
| --- | --- | --- | --- |
| `GET` | `/api/health` | anyone | is the server up |
| `POST` | `/api/auth/register` | anyone | new account + 14-day trial subscription |
| `POST` | `/api/auth/login` | anyone | returns a JWT |
| `GET` | `/api/auth/me` | signed in | who am I |
| `GET` | `/api/account` | signed in | plan, add-ons, invoices — the portal payload |
| `POST` | `/api/leads` | anyone | website enquiry form |
| `GET` | `/api/leads` | admin | every enquiry, newest first |
| `PATCH` | `/api/leads/:id` | admin | move a lead to contacted / won / lost |

Open [api.http](api.http) in VS Code and click **Send Request** above
any block to try these without leaving the editor.

---

## Where things live

### Server (`server/src/`)

| File | What it holds |
| --- | --- |
| `server.js` | boot: connect to Mongo, then listen |
| `app.js` | middleware and route mounting |
| `config/db.js` | the Mongoose connection |
| `config/memoryDb.js` | the throwaway database for `dev:mem` |
| `models/` | `User`, `Subscription`, `Invoice`, `Lead` schemas |
| `controllers/` | what each route actually does |
| `routes/` | URL → controller wiring |
| `middleware/auth.js` | `protect` (signed in) and `adminOnly` |
| `middleware/error.js` | turns any thrown error into clean JSON |
| `seed/seed.js` | the demo account |

### Client (`client/src/`)

| File | What it holds |
| --- | --- |
| `api/client.js` | **the only file that talks to the API** |
| `context/AppContext.jsx` | theme, language, sign in/out, account state |
| `pages/Home.jsx` | the marketing site |
| `pages/Portal.jsx` | the customer dashboard |
| `components/AuthModal.jsx` | sign in / sign up |
| `components/LeadForm.jsx` | the enquiry form → `POST /api/leads` |
| `data/pricing.js` | **the only file with rupee figures in it** |
| `data/content.js` | every line of copy, in English / Bengali / Hindi |
| `styles/index.css` | all the styling |

---

## Making changes

**Change a price** → `client/src/data/pricing.js`. Nothing else
hardcodes a number.

**Change wording** → `client/src/data/content.js`. Edit all three
languages (`en`, `bn`, `hi`) or the other two fall out of sync.

**Add an API endpoint** → three files, in this order:

1. `server/src/models/Thing.js` — the shape of the data
2. `server/src/controllers/thingController.js` — the logic
3. `server/src/routes/thing.routes.js` — the URL, then mount it in `app.js`

Then add one line to `client/src/api/client.js` and call it from a
component.

**Debug the API** → set a breakpoint in any `server/src` file, press
`F5`, pick **Debug API (server)**.

---

## Deploying

```bash
npm run build          # writes client/dist
```

Host `client/dist` as a static site (Vercel / Netlify — configs are
already in `client/`) and set `VITE_API_URL` to your deployed API URL.

Host `server/` on Render, Railway or a VPS with `npm start`, and set
`MONGO_URI`, `JWT_SECRET` and `CLIENT_ORIGIN` as environment variables
there. Never commit a real `.env`.

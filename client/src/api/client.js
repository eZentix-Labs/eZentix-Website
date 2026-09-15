/* ------------------------------------------------------------------
 * The one place that talks to the Express API.
 * ------------------------------------------------------------------
 * In development the Vite proxy forwards /api to http://localhost:5000
 * (see vite.config.js), so BASE stays empty and requests are
 * same-origin. In production set VITE_API_URL to the deployed API.
 * ------------------------------------------------------------------ */

const BASE = import.meta.env.VITE_API_URL || ''
const TOKEN_KEY = 'cb.token'

export const tokenStore = {
  get() {
    try {
      return window.localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },
  set(token) {
    try {
      window.localStorage.setItem(TOKEN_KEY, token)
    } catch {
      /* ignore — private mode */
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(TOKEN_KEY)
    } catch {
      /* ignore */
    }
  },
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = tokenStore.get()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(`${BASE}/api${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new Error('Cannot reach the server. Is the API running?')
  }

  const text = await res.text()
  const data = text ? JSON.parse(text) : {}

  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`)
    err.status = res.status
    throw err
  }
  return data
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  me: () => request('/auth/me', { auth: true }),
  account: () => request('/account', { auth: true }),
  createLead: (payload) => request('/leads', { method: 'POST', body: payload }),
  listLeads: () => request('/leads', { auth: true }),
}

export default api

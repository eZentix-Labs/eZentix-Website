import { createSign } from 'node:crypto'

/*
 * Adds an event to a Google Calendar as a service account — no SDK, just
 * the two HTTP calls Google documents: swap a signed JWT for an access
 * token, then insert the event.
 *
 * The service account has no calendar of its own. It writes to
 * GOOGLE_CALENDAR_ID (ezentixlabs@gmail.com) because that calendar has been
 * shared with the service account's email with "Make changes to events".
 * Setup steps are in LEADS.md at the repo root.
 */

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SCOPE = 'https://www.googleapis.com/auth/calendar.events'

const b64url = (v) => Buffer.from(typeof v === 'string' ? v : JSON.stringify(v)).toString('base64url')

export function calendarConfigured(env = process.env) {
  return Boolean(env.GOOGLE_SERVICE_ACCOUNT_EMAIL && env.GOOGLE_PRIVATE_KEY && env.GOOGLE_CALENDAR_ID)
}

async function accessToken(env) {
  const now = Math.floor(Date.now() / 1000)
  const unsigned = `${b64url({ alg: 'RS256', typ: 'JWT' })}.${b64url({
    iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  })}`
  /* Vercel stores a pasted key either with real newlines or with literal
     "\n" sequences, depending on how it was entered. Accept both. */
  const key = env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  const signature = createSign('RSA-SHA256').update(unsigned).sign(key, 'base64url')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.access_token) {
    throw new Error(`Google token: ${res.status} ${data.error_description || data.error || ''}`.trim())
  }
  return data.access_token
}

export async function addCalendarEvent(event, env = process.env) {
  const token = await accessToken(env)
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(env.GOOGLE_CALENDAR_ID)}/events`
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`Google Calendar: ${res.status} ${data.error?.message || ''}`.trim())
  return data
}

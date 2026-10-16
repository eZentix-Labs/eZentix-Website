import { addCalendarEvent, calendarConfigured } from './_lib/google-calendar.js'
import { sendWhatsApp, whatsappConfigured } from './_lib/whatsapp.js'

/*
 * POST /api/leads — the website contact form (src/components/LeadForm.jsx).
 *
 * A Vercel serverless function: the site is a static deployment, so this
 * is the only server code that runs in production. Each enquiry is
 *   1. sent as a WhatsApp alert to our own number (CallMeBot or
 *      TextMeBot, see _lib/whatsapp.js), and
 *   2. added to the ezentixlabs@gmail.com calendar as a call-back slot,
 * in parallel. The visitor is told it worked if either one lands — the
 * lead is then somewhere we will see it. If both fail they get an error
 * that tells them to call instead, so nobody is left thinking they were
 * heard when they were not.
 *
 * Configuration is all environment variables; see LEADS.md.
 *
 * In local development Vite proxies /api to the Express server instead
 * (server/src/controllers/leadController.js), which stores to MongoDB and
 * does not notify anyone.
 */

const clip = (v, max) => String(v ?? '').trim().slice(0, max)

const IST_OFFSET = 330 * 60 * 1000
const formatIST = (date) =>
  date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })

/* Indian numbers come in as 10 digits, 0 + 10, or 91 + 10. Anything else is
   passed through as typed — better a number we have to read than none. */
function whatsappNumber(phone) {
  const d = phone.replace(/\D/g, '')
  if (d.length === 10) return `91${d}`
  if (d.length === 11 && d.startsWith('0')) return `91${d.slice(1)}`
  return d
}

/*
 * The calendar event is a call-back slot, not a timestamp: roughly an hour
 * after the enquiry, on a quarter hour, so the calendar's default reminder
 * (set on the ezentixlabs@gmail.com side) fires before it. Enquiries that
 * arrive late at night or early morning land at 10:00 IST instead.
 */
export function callbackSlot(now = Date.now()) {
  const quarter = 15 * 60 * 1000
  const t = Math.ceil((now + 60 * 60 * 1000) / quarter) * quarter
  const ist = new Date(t + IST_OFFSET)
  const hour = ist.getUTCHours() + ist.getUTCMinutes() / 60
  if (hour >= 10 && hour < 19.5) return new Date(t)
  const day = ist.getUTCDate() + (hour >= 19.5 ? 1 : 0)
  return new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), day, 10, 0) - IST_OFFSET)
}

function readLead(body) {
  const lead = {
    name: clip(body.name, 80),
    business: clip(body.business, 120),
    type: clip(body.type, 60),
    phone: clip(body.phone, 20),
    message: clip(body.message, 1000),
    services: (Array.isArray(body.selectedServices) ? body.selectedServices : [])
      .slice(0, 20)
      .map((s) => clip(s, 100))
      .filter(Boolean),
  }
  const missing = ['name', 'business', 'type', 'phone'].filter((k) => !lead[k])
  if (missing.length) return { error: `Missing: ${missing.join(', ')}` }
  if (lead.phone.replace(/\D/g, '').length < 10) return { error: 'Enter a phone number with at least 10 digits' }
  return { lead }
}

function whatsappText(lead, received) {
  return [
    '*New enquiry from ezentix.com*',
    '',
    `*${lead.name}* — ${lead.business}`,
    lead.type,
    `Phone: ${lead.phone}`,
    lead.services.length ? `Wants: ${lead.services.join(', ')}` : null,
    lead.message ? `Message: ${lead.message}` : null,
    '',
    `Reply on WhatsApp: https://wa.me/${whatsappNumber(lead.phone)}`,
    `Received ${formatIST(received)} IST`,
  ]
    .filter((line) => line !== null)
    .join('\n')
}

/* The description is rendered as HTML by Google Calendar, and every value
   in it came from a stranger's form. Escape before building markup. */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function calendarEvent(lead, received) {
  const start = callbackSlot(received.getTime())
  const end = new Date(start.getTime() + 15 * 60 * 1000)
  const wa = `https://wa.me/${whatsappNumber(lead.phone)}`
  return {
    summary: `Call back: ${lead.name} (${lead.business})`,
    description: [
      `<b>${esc(lead.name)}</b> — ${esc(lead.business)}`,
      `Business type: ${esc(lead.type)}`,
      `Phone: <a href="tel:${esc(lead.phone.replace(/[^\d+]/g, ''))}">${esc(lead.phone)}</a>`,
      `WhatsApp: <a href="${wa}">${wa}</a>`,
      lead.services.length ? `Wants: ${esc(lead.services.join(', '))}` : null,
      lead.message ? `<br>Message:<br>${esc(lead.message).replace(/\n/g, '<br>')}` : null,
      `<br>Enquiry received ${formatIST(received)} IST via the website form.`,
    ]
      .filter((line) => line !== null)
      .join('<br>'),
    start: { dateTime: start.toISOString(), timeZone: 'Asia/Kolkata' },
    end: { dateTime: end.toISOString(), timeZone: 'Asia/Kolkata' },
    colorId: '11',
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}

  /* Honeypot: a field people never see. Bots fill every input; pretend it
     worked so they move on, and send nothing. */
  if (clip(body.website, 200)) return res.status(201).json({ ok: true })

  const { lead, error } = readLead(body)
  if (error) return res.status(400).json({ message: error })

  const received = new Date()
  const jobs = []
  if (whatsappConfigured()) jobs.push(['whatsapp', sendWhatsApp(whatsappText(lead, received))])
  if (calendarConfigured()) jobs.push(['calendar', addCalendarEvent(calendarEvent(lead, received))])

  if (!jobs.length) {
    console.error('[leads] neither WhatsApp nor Google Calendar is configured — see LEADS.md')
    return res.status(503).json({ message: 'Enquiries are not being received right now' })
  }

  const results = await Promise.allSettled(jobs.map(([, p]) => p))
  const delivered = []
  results.forEach((r, i) => {
    const channel = jobs[i][0]
    if (r.status === 'fulfilled') delivered.push(channel)
    else console.error(`[leads] ${channel} failed:`, r.reason?.message || r.reason)
  })

  if (!delivered.length) return res.status(502).json({ message: 'Could not deliver the enquiry' })
  return res.status(201).json({ ok: true })
}

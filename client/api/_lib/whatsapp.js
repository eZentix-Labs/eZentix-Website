/*
 * Sends a WhatsApp alert about a new lead to our own number.
 *
 * Two interchangeable providers from the same author, both a single GET.
 * Which one runs depends on which key is set (TextMeBot wins if both are):
 *
 *   CallMeBot — free, but "only for personal use", and it only delivers to
 *   a number that activated it. Sign-ups pause when the bot is full.
 *   https://www.callmebot.com/blog/free-api-whatsapp-messages/
 *
 *   TextMeBot — paid ($1/month for one recipient), sends from a WhatsApp
 *   number you link to it.  https://textmebot.com
 *
 * WHATSAPP_TO is the number that receives the alert, with country code
 * (+918436299320). Setup steps for both are in LEADS.md.
 */

export function whatsappConfigured(env = process.env) {
  return Boolean(env.WHATSAPP_TO && (env.TEXTMEBOT_APIKEY || env.CALLMEBOT_APIKEY))
}

function providerUrl(text, env) {
  const url = env.TEXTMEBOT_APIKEY
    ? new URL('https://api.textmebot.com/send.php')
    : new URL('https://api.callmebot.com/whatsapp.php')
  const params = env.TEXTMEBOT_APIKEY
    ? { recipient: env.WHATSAPP_TO, apikey: env.TEXTMEBOT_APIKEY, text }
    : { phone: env.WHATSAPP_TO, apikey: env.CALLMEBOT_APIKEY, text }
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  return url
}

export async function sendWhatsApp(text, env = process.env) {
  const url = providerUrl(text, env)
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
  const body = await res.text().catch(() => '')
  /* Both services answer some failures (a wrong key, an unactivated or
     unlinked number) with a 200 and an explanation in the body, so the
     status alone is not enough. The key is never logged: it is in the URL,
     and only the host and the body go into the error. */
  if (!res.ok || /error|invalid|not (been )?(activated|linked|connected)/i.test(body)) {
    const why = body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160)
    throw new Error(`${url.host}: ${res.status} ${why}`)
  }
}

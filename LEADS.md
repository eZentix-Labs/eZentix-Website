# Website enquiries → WhatsApp + Google Calendar

> **Status: switched off.** The form is not shown on the site right now —
> visitors reach us directly by WhatsApp, phone, email and Instagram, and the
> service picker opens WhatsApp with their choices filled in. To bring the
> form back: complete the setup below, render `<LeadForm />` again in the
> contact section (`client/src/components/Contact.jsx`, and drop the
> `lead--solo` class there), and redeploy. The function in
> `client/api/leads.js` stays deployed in the meantime and does nothing
> until it is configured.

Every time someone sends the "Tell us what you are running" form on
www.ezentix.com, `client/api/leads.js` (a Vercel function) does two things
at once:

1. **WhatsApp** — a message to **+91 84362 99320** with their name, business,
   phone, what they ticked, their message, and a `wa.me` link to reply.
2. **Google Calendar** — a red **"Call back: Name (Business)"** event on
   **ezentixlabs@gmail.com**, about an hour after the enquiry (or 10:00 next
   morning if it came in after 7:30 pm). The description has a tap-to-call
   link and a WhatsApp link.

The visitor sees "Got it" if either one lands. If both fail, they see
"That did not send. Call us on +91 84362 99320 instead." — so nobody is
told they were heard when they were not.

> **Until the steps below are done, the form tells every visitor it could
> not send.** Before this change it failed too (the old `/api/leads` was
> never deployed, so every enquiry returned a 404 and was lost).

Everything is configured with environment variables in **Vercel → your
project → Settings → Environment Variables**. Add them for *Production*
(and *Preview* if you want to test there), then **redeploy** — Vercel only
reads new variables on a fresh deployment.

---

## 1. Google Calendar (about 15 minutes, free)

A *service account* is a robot Google account the website signs in as. It has
no calendar of its own; you share yours with it.

1. Go to <https://console.cloud.google.com> signed in as
   **ezentixlabs@gmail.com**. Create a project (top bar → project picker →
   *New project*), e.g. `ezentix-website`.
2. **APIs & Services → Library** → search *Google Calendar API* → **Enable**.
3. **IAM & Admin → Service Accounts → Create service account**. Name it
   `website-leads`. Skip the optional role and user-access steps → **Done**.
4. Click the new service account → **Keys → Add key → Create new key → JSON**.
   A `.json` file downloads. **Treat it like a password** — never commit it
   or send it over WhatsApp.
5. Open that file in Notepad. You need two values from it:
   `client_email` (looks like `website-leads@ezentix-website.iam.gserviceaccount.com`)
   and `private_key` (starts `-----BEGIN PRIVATE KEY-----`).
6. Open <https://calendar.google.com> as **ezentixlabs@gmail.com** →
   gear icon → **Settings** → under *Settings for my calendars* click
   **ezentixlabs@gmail.com** → **Share with specific people or groups → Add
   people** → paste the `client_email` → permission **Make changes to events**
   → **Send**.
7. In Vercel add:

   | Name | Value |
   |---|---|
   | `GOOGLE_CALENDAR_ID` | `ezentixlabs@gmail.com` |
   | `GOOGLE_SERVICE_ACCOUNT_EMAIL` | the `client_email` |
   | `GOOGLE_PRIVATE_KEY` | the `private_key`, everything between the quotes, `\n`s and all |

8. So the event actually pings you: install the Google Calendar app on your
   phone signed in as ezentixlabs@gmail.com, and in that calendar's settings
   set a default event notification (10 minutes works well).

Then delete the downloaded `.json` file, or keep it somewhere private. If it
ever leaks, delete the key in step 4 and make a new one.

---

## 2. WhatsApp alert — pick one provider

Both are unofficial services that send WhatsApp messages through a simple
web request. Set **`WHATSAPP_TO`** = `+918436299320` either way, plus the key
for the one you choose. If both keys are set, TextMeBot is used.

### Option A — CallMeBot (free, personal use only)

**As of 16 Oct 2026 CallMeBot is not taking new numbers** ("The bot is
currently full. Please check back in a few days"), and its free API is
stated to be *only for personal use*.

When a slot is open:

1. Open <https://www.callmebot.com/blog/free-api-whatsapp-messages/> and add
   the bot number shown there to the contacts on the **8436299320** phone.
2. From WhatsApp on that phone, send it:
   `I allow callmebot to send me messages`
3. It replies with `API Activated for your phone number. Your APIKEY is …`.
4. In Vercel add `CALLMEBOT_APIKEY` = that key.

### Option B — TextMeBot (paid, about $1/month)

The same author's paid service, recommended by CallMeBot for anything beyond
personal use. Its single-recipient plan sends to one number for $1/month.

It sends **from** a WhatsApp number you link to it (like WhatsApp Web).
A message from your own number to itself lands in WhatsApp's "Message
yourself" chat and may not ring the phone, so link a
**different** number as the sender — a spare SIM or the shop's other phone —
and keep 8436299320 as the recipient.

1. <https://textmebot.com> → get an API key (there is a free 2-day demo to try it).
2. Follow the emailed links to add and link the sending WhatsApp number.
3. Subscribe to the 1-recipient plan.
4. In Vercel add `TEXTMEBOT_APIKEY` = that key.

---

## 3. Test it

After redeploying, fill the form on www.ezentix.com with your own details.
Within a minute you should have the WhatsApp message and a red event in the
calendar.

If something is missing: **Vercel → project → Logs**, filter by
`/api/leads`. Each failure is logged as one line:

| Log line contains | Meaning |
|---|---|
| `neither WhatsApp nor Google Calendar is configured` | No variables set, or the project was not redeployed after adding them |
| `Google token: 400 invalid_grant` | `GOOGLE_PRIVATE_KEY` or `GOOGLE_SERVICE_ACCOUNT_EMAIL` is wrong or from a deleted key |
| `Google Calendar: 404 Not Found` | The calendar is not shared with the service account (step 1.6), or `GOOGLE_CALENDAR_ID` is misspelled |
| `Google Calendar: 403` | Shared, but with "See all event details" instead of "Make changes to events" |
| `api.callmebot.com: … APIKey is invalid` | Wrong key, or `WHATSAPP_TO` is not the number that activated CallMeBot |
| `api.textmebot.com: …` | Read the rest of the line; usually an unlinked sender number or an expired subscription |

---

## Notes

- **Spam:** the form has a hidden "honeypot" field that people never see.
  Bots fill it in, and those submissions are dropped silently.
- **Privacy:** an enquiry passes through Google and through the WhatsApp
  provider you picked. The form's promise ("We use your details only to get
  back to you") still holds; nothing else receives it.
- **Local development** is unchanged: `npm run dev` proxies `/api` to the
  Express server, which stores leads in MongoDB and notifies nobody.
- **Official route:** if this ever needs to be fully official, Meta's
  WhatsApp Cloud API can replace `client/api/_lib/whatsapp.js` without
  touching anything else. It needs Business verification, a dedicated number
  and an approved message template.

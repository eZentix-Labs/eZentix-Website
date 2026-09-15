import 'dotenv/config'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import connectDB from '../config/db.js'
import User from '../models/User.js'
import Subscription from '../models/Subscription.js'
import Invoice from '../models/Invoice.js'

/* Recreates the demo account the old front-end faked in AppContext,
   so the portal has real data to render on a fresh database.

   Run: npm run seed  (from the server folder, or `npm run seed` at
   the project root). Safe to re-run — it wipes and rewrites only
   these two accounts, nothing else in the database is touched. */

const DEMO_EMAIL = 'demo@charubala.com'
const ADMIN_EMAIL = 'admin@charubala.com'

/* Assumes mongoose is already connected — `npm run dev:mem` calls this
   directly against its temporary database. */
export async function seedDatabase({ quiet = false } = {}) {
  const demoOld = await User.findOne({ email: DEMO_EMAIL })
  if (demoOld) {
    await Promise.all([
      Subscription.deleteMany({ user: demoOld._id }),
      Invoice.deleteMany({ user: demoOld._id }),
    ])
    await demoOld.deleteOne()
  }
  await User.deleteOne({ email: ADMIN_EMAIL })

  const demo = await User.create({
    email: DEMO_EMAIL,
    password: 'demo1234',
    businessName: 'Your Business',
  })

  await User.create({
    email: ADMIN_EMAIL,
    password: 'admin1234',
    businessName: 'Charubala LLP',
    role: 'admin',
  })

  await Subscription.create({
    user: demo._id,
    planId: 'pro',
    planName: 'Pro',
    cycle: 'monthly',
    amount: 2499,
    status: 'active',
    startedOn: new Date('2026-06-01'),
    renewsOn: new Date('2026-09-01'),
    posUrl: 'https://pos.charubalainc.com',
    optedServices: [
      'Charu OS — Pro',
      'Google Business Profile management',
      'Instagram + Facebook management',
      'WhatsApp billing and review requests',
      'Menu microsite',
      'Complimentary agency access',
    ],
    addOns: [{ name: 'Your own .com domain', price: 3000, unit: 'year' }],
  })

  await Invoice.insertMany([
    { user: demo._id, no: 'CB-2026-0184', date: new Date('2026-08-01'), amount: 2499, status: 'paid' },
    { user: demo._id, no: 'CB-2026-0141', date: new Date('2026-07-01'), amount: 2499, status: 'paid' },
    { user: demo._id, no: 'CB-2026-0098', date: new Date('2026-06-01'), amount: 2499, status: 'paid' },
  ])

  if (!quiet) {
    console.log('[seed] done')
    console.log(`       customer → ${DEMO_EMAIL} / demo1234`)
    console.log(`       admin    → ${ADMIN_EMAIL} / admin1234`)
  }
}

/* Only run standalone when invoked as `node src/seed/seed.js`. */
const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]

if (isCli) {
  connectDB()
    .then(seedDatabase)
    .then(() => mongoose.connection.close())
    .catch(async (err) => {
      console.error('[seed] failed:', err.message)
      await mongoose.connection.close().catch(() => {})
      process.exit(1)
    })
}

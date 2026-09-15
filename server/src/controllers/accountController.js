import Subscription from '../models/Subscription.js'
import Invoice from '../models/Invoice.js'
import asyncHandler from '../utils/asyncHandler.js'

/* GET /api/account
 * One call returns everything the portal page renders. The shape is
 * flat on purpose — it is what Portal.jsx reads off `user`. */
export const getAccount = asyncHandler(async (req, res) => {
  const [subscription, invoices] = await Promise.all([
    Subscription.findOne({ user: req.user._id }).lean(),
    Invoice.find({ user: req.user._id }).sort({ date: -1 }).lean(),
  ])

  const iso = (d) => (d ? new Date(d).toISOString().slice(0, 10) : null)

  res.json({
    ...req.user.toPublic(),
    planId: subscription?.planId ?? null,
    planName: subscription?.planName ?? '—',
    cycle: subscription?.cycle ?? 'monthly',
    amount: subscription?.amount ?? 0,
    status: subscription?.status ?? 'inactive',
    startedOn: iso(subscription?.startedOn),
    renewsOn: iso(subscription?.renewsOn),
    posUrl: subscription?.posUrl ?? 'https://pos.charubalainc.com',
    optedServices: subscription?.optedServices ?? [],
    addOns: (subscription?.addOns ?? []).map(({ name, price, unit }) => ({ name, price, unit })),
    invoices: invoices.map((i) => ({
      no: i.no,
      date: iso(i.date),
      amount: i.amount,
      status: i.status,
    })),
  })
})

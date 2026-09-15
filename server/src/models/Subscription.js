import mongoose from 'mongoose'

/* One live subscription per customer. The field names match the keys
   the portal page reads (see client/src/pages/Portal.jsx) so the API
   response can be handed straight to the UI. */
const addOnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, default: 'year' },
  },
  { _id: false },
)

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    planId: { type: String, default: 'starter' },
    planName: { type: String, default: 'Starter' },
    cycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    amount: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'paused', 'cancelled'], default: 'active' },
    startedOn: { type: Date, default: Date.now },
    renewsOn: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 86400000),
    },
    posUrl: { type: String, default: 'https://pos.charubalainc.com' },
    optedServices: { type: [String], default: [] },
    addOns: { type: [addOnSchema], default: [] },
  },
  { timestamps: true },
)

export default mongoose.model('Subscription', subscriptionSchema)

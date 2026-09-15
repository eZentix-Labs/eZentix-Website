import mongoose from 'mongoose'

const invoiceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    no: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'pending'], default: 'pending' },
  },
  { timestamps: true },
)

export default mongoose.model('Invoice', invoiceSchema)

import mongoose from 'mongoose'

/* Enquiry from the website form. Kept deliberately loose — a lead we
   half-captured is worth more than a lead we rejected on validation. */
const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    business: { type: String, required: [true, 'Business name is required'], trim: true },
    type: { type: String, required: [true, 'Business type is required'], trim: true },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      validate: {
        validator: (v) => v.replace(/\D/g, '').length >= 10,
        message: 'Enter a phone number with at least 10 digits',
      },
    },
    message: { type: String, trim: true, default: '' },
    selectedServices: { type: [String], default: [] },
    source: { type: String, default: 'website' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'won', 'lost'],
      default: 'new',
    },
  },
  { timestamps: true },
)

export default mongoose.model('Lead', leadSchema)

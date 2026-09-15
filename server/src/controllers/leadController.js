import Lead from '../models/Lead.js'
import asyncHandler from '../utils/asyncHandler.js'

/* POST /api/leads — public, this is the website contact form. */
export const createLead = asyncHandler(async (req, res) => {
  const { name, business, type, phone, message, selectedServices, source } = req.body

  const lead = await Lead.create({
    name,
    business,
    type,
    phone,
    message,
    selectedServices: Array.isArray(selectedServices) ? selectedServices : [],
    source: source || 'website',
  })

  res.status(201).json({ ok: true, id: lead._id })
})

/* GET /api/leads — admin only, newest first. */
export const listLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 }).limit(200).lean()
  res.json({ count: leads.length, leads })
})

/* PATCH /api/leads/:id — admin only, move a lead along the pipeline. */
export const updateLeadStatus = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true },
  )
  if (!lead) return res.status(404).json({ message: 'Lead not found' })
  res.json(lead)
})

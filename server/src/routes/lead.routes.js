import { Router } from 'express'
import { createLead, listLeads, updateLeadStatus } from '../controllers/leadController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()

router.post('/', createLead)
router.get('/', protect, adminOnly, listLeads)
router.patch('/:id', protect, adminOnly, updateLeadStatus)

export default router

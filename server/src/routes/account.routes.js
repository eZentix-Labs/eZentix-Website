import { Router } from 'express'
import { getAccount } from '../controllers/accountController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.get('/', protect, getAccount)

export default router

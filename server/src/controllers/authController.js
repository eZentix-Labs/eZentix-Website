import User from '../models/User.js'
import Subscription from '../models/Subscription.js'
import asyncHandler from '../utils/asyncHandler.js'
import { signToken } from '../utils/token.js'

/* POST /api/auth/register */
export const register = asyncHandler(async (req, res) => {
  const { email, password, businessName } = req.body

  if (!email || !password || !businessName) {
    return res.status(400).json({ message: 'Email, password and business name are required' })
  }

  const exists = await User.findOne({ email: email.toLowerCase() })
  if (exists) {
    return res.status(409).json({ message: 'That email already has an account — sign in instead' })
  }

  const user = await User.create({ email, password, businessName })

  /* Every new account starts on a trial subscription so the portal
     has something to show. Replace with your checkout flow when
     payments go live. */
  await Subscription.create({
    user: user._id,
    planId: 'starter',
    planName: 'Starter',
    cycle: 'monthly',
    amount: 0,
    status: 'active',
    startedOn: new Date(),
    renewsOn: new Date(Date.now() + 14 * 86400000),
    optedServices: ['Charu OS — Starter (14-day trial)'],
  })

  res.status(201).json({ token: signToken(user._id), user: user.toPublic() })
})

/* POST /api/auth/login */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
  if (!user || !(await user.matches(password))) {
    return res.status(401).json({ message: 'Wrong email or password' })
  }

  res.json({ token: signToken(user._id), user: user.toPublic() })
})

/* GET /api/auth/me */
export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toPublic() })
})

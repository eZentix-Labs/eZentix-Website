import User from '../models/User.js'
import { verifyToken } from '../utils/token.js'

/* Reads the Bearer token, hangs the user off req.user.
   Anything behind this middleware is a logged-in-only route. */
export async function protect(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Not signed in' })
  }

  try {
    const { sub } = verifyToken(token)
    const user = await User.findById(sub)
    if (!user) return res.status(401).json({ message: 'Account no longer exists' })
    req.user = user
    next()
  } catch {
    res.status(401).json({ message: 'Session expired — sign in again' })
  }
}

export function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' })
  }
  next()
}

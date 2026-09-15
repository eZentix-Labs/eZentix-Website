import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import authRoutes from './routes/auth.routes.js'
import leadRoutes from './routes/lead.routes.js'
import accountRoutes from './routes/account.routes.js'
import { notFound, errorHandler } from './middleware/error.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ ok: true, at: new Date().toISOString() }))

app.use('/api/auth', authRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/account', accountRoutes)

app.use(notFound)
app.use(errorHandler)

export default app

import 'dotenv/config'
import app from './app.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT || 5000

/* --mem (npm run dev:mem) spins up a temporary MongoDB instead of
   using MONGO_URI — handy before you have installed one. */
const useMemoryDb = process.argv.includes('--mem') || process.env.USE_MEMORY_DB === 'true'

async function start() {
  if (useMemoryDb) {
    const { default: startMemoryMongo } = await import('./config/memoryDb.js')
    await startMemoryMongo()
  }

  await connectDB()

  /* A throwaway database starts empty, so plant the demo account. */
  if (useMemoryDb) {
    const { seedDatabase } = await import('./seed/seed.js')
    await seedDatabase()
  }

  app.listen(PORT, () => console.log(`[api] http://localhost:${PORT}`))
}

start().catch((err) => {
  console.error('[db] could not connect:', err.message)
  console.error('     Start MongoDB, or set MONGO_URI in server/.env,')
  console.error('     or run `npm run dev:mem` for a throwaway database.')
  process.exit(1)
})

/* ------------------------------------------------------------------
 * Throwaway MongoDB, for when you have not installed one yet.
 * ------------------------------------------------------------------
 * `npm run dev:mem` boots a real mongod in a temp folder and points
 * MONGO_URI at it, so the whole stack runs with nothing installed.
 * The catch: everything is gone when you stop the server. Use a local
 * MongoDB or an Atlas cluster (set MONGO_URI in server/.env) as soon
 * as you want your data to stick around.
 * ------------------------------------------------------------------ */
import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function startMemoryMongo() {
  const mongod = await MongoMemoryServer.create()
  process.env.MONGO_URI = mongod.getUri('charubala')
  console.log('[db] in-memory MongoDB — data is wiped when you stop the server')

  const stop = async () => {
    await mongod.stop()
    process.exit(0)
  }
  process.on('SIGINT', stop)
  process.on('SIGTERM', stop)

  return mongod
}

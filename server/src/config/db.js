import mongoose from 'mongoose'

export default async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    throw new Error('MONGO_URI is missing — copy server/.env.example to server/.env')
  }

  mongoose.set('strictQuery', true)
  const conn = await mongoose.connect(uri)
  console.log(`[db] connected → ${conn.connection.host}/${conn.connection.name}`)
  return conn
}

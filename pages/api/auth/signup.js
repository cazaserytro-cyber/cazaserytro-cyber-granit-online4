import clientPromise from '../../../lib/mongodb'
import bcrypt from 'bcryptjs'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({ error: 'email and password required' })
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB || 'granit')
  const users = db.collection('users')
  const exists = await users.findOne({ email })
  if(exists) return res.status(400).json({ error: 'user exists' })
  const hash = await bcrypt.hash(password, 10)
  await users.insertOne({ email, password: hash, createdAt: new Date() })
  res.status(201).json({ ok: true })
}

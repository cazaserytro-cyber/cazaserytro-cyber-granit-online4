import clientPromise from '../../../lib/mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({ error: 'email and password required' })
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB || 'granit')
  const users = db.collection('users')
  const u = await users.findOne({ email })
  if(!u) return res.status(401).json({ error: 'invalid' })
  const ok = await bcrypt.compare(password, u.password)
  if(!ok) return res.status(401).json({ error: 'invalid' })
  const token = jwt.sign({ userId: u._id, email: u.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })
  res.status(200).json({ user: { email: u.email, token } })
}

import clientPromise from '../../../lib/mongodb'
import jwt from 'jsonwebtoken'

export default async function handler(req, res){
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB || 'granit')
  const col = db.collection('comments')

  if(req.method === 'GET'){
    const { productId } = req.query
    const q = productId ? { productId } : {}
    const comments = await col.find(q).sort({ createdAt: -1 }).toArray()
    return res.status(200).json({ comments })
  }

  if(req.method === 'POST'){
    const auth = req.headers.authorization || ''
    const token = auth.replace('Bearer ','')
    try{
      const data = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
      const { productId, text } = req.body
      if(!productId || !text) return res.status(400).json({ error: 'productId and text required' })
      const comment = { productId, text, userId: data.userId, userEmail: data.email, createdAt: new Date() }
      const r = await col.insertOne(comment)
      return res.status(201).json({ insertedId: r.insertedId })
    }catch(e){
      return res.status(401).json({ error: 'unauthorized' })
    }
  }

  res.status(405).end()
}

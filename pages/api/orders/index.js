import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res){
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB || 'granit')
  const col = db.collection('orders')

  if(req.method === 'POST'){
    const data = req.body
    if(!data || !data.items) return res.status(400).json({ error: 'items required' })
    data.createdAt = new Date()
    const r = await col.insertOne(data)
    return res.status(201).json({ insertedId: r.insertedId })
  }

  if(req.method === 'GET'){
    const orders = await col.find({}).sort({ createdAt: -1 }).toArray()
    return res.status(200).json({ orders })
  }

  res.status(405).end()
}

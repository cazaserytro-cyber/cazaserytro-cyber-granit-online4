import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res){
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB || 'granit')
  const col = db.collection('products')

  if(req.method === 'GET'){
    const { id } = req.query
    if(id){
      const product = await col.findOne({_id: new ObjectId(id)})
      return res.status(200).json({ product })
    }
    const products = await col.find({}).limit(100).toArray()
    return res.status(200).json({ products })
  }

  if(req.method === 'POST'){
    const data = req.body
    const result = await col.insertOne(data)
    return res.status(201).json({ insertedId: result.insertedId })
  }

  res.status(405).end()
}

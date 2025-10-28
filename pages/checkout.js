import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Checkout(){
  const [cart, setCart] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const router = useRouter()

  useEffect(()=> setCart(JSON.parse(localStorage.getItem('gr_cart')||'[]')),[])

  async function submit(e){
    e.preventDefault()
    const res = await axios.post('/api/orders', { name, email, address, items: cart })
    localStorage.removeItem('gr_cart')
    alert('Замовлення прийнято')
    router.push('/')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Оформлення замовлення</h1>
      <form onSubmit={submit} className="space-y-4 max-w-lg">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Ім'я" className="w-full p-2 rounded bg-[#071023]" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 rounded bg-[#071023]" />
        <textarea value={address} onChange={e=>setAddress(e.target.value)} placeholder="Адреса/коментар" className="w-full p-2 rounded bg-[#071023]" />
        <button className="px-4 py-2 bg-accent text-black rounded">Надіслати замовлення</button>
      </form>
    </div>
  )
}

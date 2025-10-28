import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Cart(){
  const [cart, setCart] = useState([])
  useEffect(()=> setCart(JSON.parse(localStorage.getItem('gr_cart')||'[]')),[])

  const remove = (i)=>{
    const c = [...cart]; c.splice(i,1); setCart(c); localStorage.setItem('gr_cart', JSON.stringify(c))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Кошик</h1>
      {cart.length===0 ? <div>Кошик порожній</div> : (
        <div className="space-y-4">
          {cart.map((it,i)=> (
            <div key={i} className="p-4 bg-[#071023] rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{it.name}</div>
                <div className="text-sm text-gray-400">{it.price} UAH</div>
              </div>
              <div className="flex gap-2 items-center">
                <button onClick={()=>remove(i)} className="px-2 py-1 border rounded">Видалити</button>
              </div>
            </div>
          ))}
          <Link href="/checkout" className="inline-block px-4 py-2 bg-accent text-black rounded">Оформити замовлення</Link>
        </div>
      )}
    </div>
  )
}

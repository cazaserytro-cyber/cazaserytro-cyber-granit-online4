import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Signup(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function submit(e){
    e.preventDefault()
    try{
      await axios.post('/api/auth/signup', { email, password })
      alert('Реєстрація успішна — увійдіть')
      router.push('/auth/login')
    }catch(e){
      alert('Помилка при реєстрації')
    }
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Реєстрація</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 rounded bg-[#071023]" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Пароль" className="w-full p-2 rounded bg-[#071023]" />
        <button className="px-4 py-2 bg-accent text-black rounded">Зареєструватися</button>
      </form>
    </div>
}

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

export default function Header(){
  const { t, i18n } = useTranslation()
  const [user, setUser] = useState(null)
  useEffect(()=>{
    try{ const u=localStorage.getItem('gr_user'); if(u) setUser(JSON.parse(u)) }catch(e){}
  },[])
  return (
    <header className="w-full bg-granite/80 backdrop-blur sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-semibold">Granit Onlane</div>
          <nav className="hidden md:flex gap-4 text-sm">
            <Link href="/">Каталог</Link>
            <Link href="/catalog">Каталог</Link>
            <Link href="/gallery">Галерея</Link>
            <Link href="/about">Про нас</Link>
            <Link href="/blog">Блог</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="mailto:cazaser.ytro@gmail.com">cazaser.ytro@gmail.com</a>
          <a href="tel:+380969044327">+380 96 904 4327</a>
          <Link href="/cart" className="px-3 py-1 border rounded">Кошик</Link>
          {user ? <span className="px-3 py-1 border rounded">Привіт, {user.email}</span> : <Link href="/auth/login" className="px-3 py-1 border rounded">Увійти</Link>}
          <button onClick={() => i18n.changeLanguage(i18n.language === 'uk' ? 'en' : 'uk')} className="px-3 py-1 border rounded">EN/UA</button>
        </div>
      </div>
    </header>
  )
}

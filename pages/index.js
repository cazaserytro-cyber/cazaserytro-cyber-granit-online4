import useSWR from 'swr'
import ProductCard from '../components/ProductCard'
import fetcher from '../utils/fetcher'

export default function Home(){
  const { data } = useSWR('/api/products', fetcher)
  const products = data?.products || []

  return (
    <div>
      <section className="mb-8 rounded-lg p-8 bg-gradient-to-r from-black/50 to-[#071023]/40">
        <h1 className="text-4xl font-bold">Granit Onlane - Вироби з натурального каменю</h1>
        <p className="mt-4 text-gray-300">Виготовлення пам'ятників, підвіконь, плитки, раковин та іншого. Якість та монтаж під ключ.</p>
        <div className="mt-6">
          <a href="/catalog" className="px-4 py-2 border rounded">Переглянути вироби</a>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Популярні товари</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0,6).map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>
    </div>
  )
}

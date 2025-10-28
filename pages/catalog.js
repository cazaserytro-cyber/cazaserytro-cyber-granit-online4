import useSWR from 'swr'
import ProductCard from '../components/ProductCard'
import fetcher from '../utils/fetcher'

export default function Catalog(){
  const { data } = useSWR('/api/products', fetcher)
  const products = data?.products || []

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Каталог</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  )
}

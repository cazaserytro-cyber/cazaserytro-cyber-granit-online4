import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'
import Comments from '../../components/Comments'

export default function ProductPage(){
  const router = useRouter()
  const { id } = router.query
  const { data } = useSWR(id ? `/api/products?id=${id}` : null, fetcher)
  const product = data?.product

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('gr_cart')||'[]')
    cart.push({ productId: product._id, name: product.name, price: product.price })
    localStorage.setItem('gr_cart', JSON.stringify(cart))
    alert('Додано в кошик')
  }

  if(!product) return <div>Завантаження...</div>

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <img src={product.images?.[0] || '/sample-images/sample1.jpg'} alt={product.name} className="w-full h-96 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-4 text-gray-300">{product.long_description}</p>
          <div className="mt-6 font-bold text-xl">{product.price} UAH</div>
          <button onClick={addToCart} className="mt-4 px-4 py-2 bg-accent text-black rounded">Додати в кошик</button>
        </div>
      </div>
      <div className="mt-8">
        <Comments productId={product._id} />
      </div>
    </div>
  )
}

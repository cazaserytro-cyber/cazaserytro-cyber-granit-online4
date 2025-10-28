import Link from 'next/link'
export default function ProductCard({product}){
  return (
    <div className="bg-[#0b1220] border border-gray-700 rounded overflow-hidden">
      <img src={product.images?.[0] || '/sample-images/sample1.jpg'} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-400 mt-2">{product.short_description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-bold">{product.price} UAH</div>
          <Link href={`/products/${product._id}`} className="px-3 py-1 border rounded">Деталі</Link>
        </div>
      </div>
    </div>
  )
}

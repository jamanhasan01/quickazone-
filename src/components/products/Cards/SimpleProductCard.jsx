import AddToCartButton from '@/components/AddToCartButton'
import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'

const SimpleProductCard = ({ product }) => {
  const { name, image, price,_id } = product

  return (
    <div className='flex items-center gap-4 p-3 border border-gray-200 rounded-md hover:shadow-md transition-all bg-white'>
      {/* Product Image */}
      <div className='w-14 h-14 rounded-md overflow-hidden'>
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Info Section */}
      <div className='flex-1 overflow-hidden'>
        <h4 className='text-sm font-medium text-gray-800 truncate'>
          {name.length > 30 ? `${name.slice(0, 30)}...` : name}
        </h4>
        <div className='text-sm font-semibold text-blue-600 mt-1'>${price}</div>
      </div>

      {/* Optional Add to Cart Icon */}
      <button className='text-gray-500 hover:text-blue-500 transition hover:cursor-pointer'>
        <AddToCartButton id={_id} />
      </button>
    </div>
  )
}

export default SimpleProductCard

import AddToCartButton from '@/components/AddToCartButton'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegHeart } from 'react-icons/fa'
import { FiStar, FiShoppingCart } from 'react-icons/fi'

const ProductCard = ({ product }) => {
  const { _id, name, image, price, rating, numReviews, countInStock } = product

  const roundedRating = Math.round(rating || 0)


  const productTitle = name
  const displayPrice = price.toFixed(2)

  return (
    <div className='p-3 group border border-gray-200'>
      {/* Wishlist Button */}


      {/* Product Image */}
      <Link href={`/product/${_id}`}>
        <figure className='w-full h-[150px] overflow-hidden rounded-xl cursor-pointer'>
          <Image
            src={image}
            alt={productTitle || 'Product Image'}
            width={400}
            height={400}
            className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
            loading='lazy'
          />
        </figure>
      </Link>

      {/* Product Info */}
      <div className='mt-4 space-y-2'>
        <Link href={`/product/${_id}`}>
          <h6 className='text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 cursor-pointer'>
            {productTitle.length > 40 ? productTitle.slice(0, 40) + '...' : productTitle}
          </h6>
        </Link>

        {/* Ratings */}
        <div className='flex items-center gap-1 text-yellow-500 text-sm'>
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} className={i < roundedRating ? 'fill-yellow-400' : 'text-gray-300'} />
          ))}
          <span className='text-xs text-gray-600 ml-2'>
            ({rating.toFixed(1)})
            {numReviews > 0 && <span className='ml-1'>• {numReviews} reviews</span>}
          </span>
        </div>

        {/* Price and Cart */}
        <div className='flex items-center justify-between mt-3'>
          <span className='text-lg font-bold text-gray-800'>${displayPrice}</span>
          <AddToCartButton id={_id} />
        </div>
      </div>
      
      {/* Hover Overlay Effect (Optional) */}
      <div className='absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none'></div>
    </div>
  )
}

export default ProductCard

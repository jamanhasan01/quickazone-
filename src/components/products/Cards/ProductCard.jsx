import AddToCartButton from '@/components/AddToCartButton'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegHeart } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { FiStar } from 'react-icons/fi'

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    image,
    price,
    rating,
    numReviews,
    countInStock,
  } = product

  const roundedRating = Math.round(rating || 0)

  const imageUrl =
    image && image.length > 0 && typeof image[0] === 'string' && image[0].startsWith('http')
      ? image[0]
      : '/images/placeholder.jpg'

  const productTitle = name
  const displayPrice = price.toFixed(2)

  return (
    <div className='p-2 bg-base-100  shadow-xl hover:shadow-2xl transition-shadow rounded-md group'>
      <Link href={`/product/${_id}`} passHref>
        <figure className='w-full h-[150]  overflow-hidden cursor-pointer'>
          <Image
            src={image}
            alt={productTitle || 'Product Image'}
            width={200}
            height={200}
            className='rounded-xl object-cover w-full h-full p-2 transition-transform duration-300 group-hover:scale-105'
            loading='lazy'
          />
        </figure>
      </Link>

      <div className='mt-4 space-y-2'>
        <Link href={`/product/${_id}`} passHref>
          <h6 className='text-sm font-bold cursor-pointer hover:text-blue-600'>
            {productTitle.length > 38 ? productTitle.slice(0, 38) + '...' : productTitle}
          </h6>
        </Link>
        <div className='flex items-center gap-2'>
          <div className='rating rating-sm'>
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type='radio'
                name={`rating-${_id}`}
                className='mask mask-star-2 bg-yellow-400'
                checked={i + 1 === roundedRating}
                readOnly
              />
            ))}
          </div>
          <span className='text-xs text-gray-600'>
            ({rating.toFixed(1)})
            {numReviews > 0 && <span className='ml-1'>({numReviews} reviews)</span>}
          </span>
        </div>
        <div className='flex justify-between items-center w-full'>
          <span className='text-lg font-bold '>${displayPrice}</span>
          <AddToCartButton id={_id}></AddToCartButton>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
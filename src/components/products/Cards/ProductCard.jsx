// components/ProductCard.jsx
// This component is designed to be a Server Component by default,
// meaning it does not use client-side Hooks (useState, useEffect, onClick directly).
// If you need interactive elements (like an Add to Cart button or clickable Heart icon),
// they should be wrapped in their own 'use client' components.

import Image from 'next/image'
import Link from 'next/link'
import { FaRegHeart } from 'react-icons/fa' // For the Heart icon
import { FiShoppingCart } from 'react-icons/fi' // Potentially for a client-side AddToCart button
import { FiStar } from 'react-icons/fi' // For the star icon (if you want one next to the rating number)

const ProductCard = ({ product }) => {
  // Destructure the product object based on YOUR API's EXACT format
  const {
    _id, // Unique ID for key and links
    name, // Used as the product title
    image, // Array of image URLs
    price, // Numeric price
    rating, // Numeric rating (e.g., 0, 3.5, 5)
    numReviews, // Number of reviews
    countInStock, // For stock availability check (if you add an AddToCart button)
    // You also have brand, category, description, etc., available if needed
  } = product

  // Calculate rounded rating for the star inputs (DaisyUI)
  const roundedRating = Math.round(rating || 0) // 'rating' is directly a number from your API

  // Determine the image source safely
  // IMPORTANT: Ensure your backend provides valid image URLs.
  // Replace '/images/placeholder.jpg' with a real path in your public folder.
  const imageUrl =
    image && image.length > 0 && typeof image[0] === 'string' && image[0].startsWith('http')
      ? image[0] // Use the first image if it's a valid URL string
      : '/images/placeholder.jpg' // Fallback to a placeholder image

  const productTitle = name // Use 'name' from your API for the title
  const displayPrice = price.toFixed(2) // Format price to 2 decimal places

  return (
    <div className='p-2 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow rounded-md group'>
      {/* Product Image - clickable to product detail page */}
      <Link href={`/product/${_id}`} passHref>
        <figure className='w-[150px] mx-auto h-[150px] overflow-hidden cursor-pointer'>
          <Image
            src={image}
            alt={productTitle || 'Product Image'} // Fallback alt text for accessibility
            width={200}
            height={200}
            className='rounded-xl object-contain w-full h-full p-2 transition-transform duration-300 group-hover:scale-105'
            loading='lazy' // Optimize image loading
          />
        </figure>
      </Link>

      {/* Product Body Content */}
      <div className='mt-4 space-y-2'>
        {/* Product Title - clickable */}
        <Link href={`/product/${_id}`} passHref>
          <h6 className='text-sm font-bold cursor-pointer hover:text-blue-600'>
            {/* Truncate title if too long, add ellipsis */}
            {productTitle.length > 38 ? productTitle.slice(0, 38) + '...' : productTitle}
          </h6>
        </Link>

        {/* Rating Section */}
        <div className='flex items-center gap-2'>
          {/* DaisyUI star rating display */}
          <div className='rating rating-sm'>
            {[...Array(5)].map((_, i) => (
              <input
                key={i} // Key is fine here as these are static star inputs
                type='radio'
                name={`rating-${_id}`} // Unique name for each product's rating group
                className='mask mask-star-2 bg-yellow-400'
                checked={i + 1 === roundedRating} // Check the star based on rounded rating
                readOnly // Stars are for display only, not interactive here
              />
            ))}
          </div>
          {/* Display numerical rating and review count */}
          <span className='text-xs text-gray-600'>
            {/* Display rating with one decimal point */}({rating.toFixed(1)})
            {/* Conditionally display review count if greater than 0 */}
            {numReviews > 0 && <span className='ml-1'>({numReviews} reviews)</span>}
          </span>
        </div>

        {/* Price and Action Icon Section */}
        <div className='flex justify-between items-center w-full'>
          <span className='text-lg font-bold '>${displayPrice}</span>
          {/* Heart icon - currently for display. If interactive, wrap in 'use client' component. */}
          <FaRegHeart className='text-main cursor-pointer hover:text-red-500 transition-colors' />
        </div>

        {/* Conditional "Add to Cart" or "Out of Stock" button.
            This part usually requires client-side interactivity (onClick).
            You would create a separate 'use client' component (e.g., AddToCartButton.jsx)
            and import it here to handle the logic.
        */}
        {/*
        {countInStock > 0 ? (
          <AddToCartButton productId={_id} productName={productTitle} />
        ) : (
          <button
            disabled
            className="flex w-full items-center justify-center rounded-md bg-gray-400 px-4 py-2 font-medium text-white cursor-not-allowed mt-2"
          >
            Out of Stock
          </button>
        )}
        */}
      </div>
    </div>
  )
}

export default ProductCard

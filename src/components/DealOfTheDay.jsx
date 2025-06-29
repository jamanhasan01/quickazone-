'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const DealOfTheDay = () => {
  // --- STEP 1: ADD STATE FOR PRODUCT, LOADING, AND ERRORS ---
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  // --- STEP 2: FETCH DATA FROM YOUR API ---
  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await fetch('/api/dealoftheday')
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`)
        }
        const result = await res.json()
        setProduct(result.data) // Assuming your API returns { data: productObject }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDeal()
  }, []) // Empty array ensures this runs only once

  // Countdown timer logic (no changes needed here)
  useEffect(() => {
    if (!product) return // Don't start timer if there's no product
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const { hours, minutes, seconds } = prevTime
        if (seconds > 0) return { ...prevTime, seconds: seconds - 1 }
        if (minutes > 0) return { ...prevTime, minutes: minutes - 1, seconds: 59 }
        if (hours > 0) return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 }
        clearInterval(timer)
        return { hours: 0, minutes: 0, seconds: 0 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [product]) // Restart timer if the product changes

  // --- STEP 3: HANDLE LOADING, ERROR, AND NO-DATA STATES ---
  if (isLoading) {
    return (
      <section className='wrapper'>
        <p className='text-center text-gray-500'>Loading Deal of the Day...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className='wrapper'>
        <p className='text-center text-red-500'>Error: {error}</p>
      </section>
    )
  }

  if (!product) {
    return (
      <section className='wrapper'>
        <p className='text-center text-gray-700'>
          No special deal available right now. Check back later!
        </p>
      </section>
    )
  }

  // --- STEP 4: RENDER THE COMPONENT WITH DYNAMIC DATA ---
  return (
    <section>
      <div className='wrapper grid md:grid-cols-2 gap-8 items-center'>
        {/* Dynamic Image */}
        <div>
          <Image
            src={product?.image }
            alt={product.name}
            className='w-[500px] h-[500px] object-cover rounded-lg shadow-lg'
            width={500}
            height={500}
          />
        </div>

        <div>
          <h1 className='text-2xl font-bold text-gray-800 mb-4'>Deal Of The Day</h1>

          {/* Dynamic Rating */}
          <div className='flex mb-4'>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-2xl ${
                  i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
            <span className='ml-2 text-gray-600'>({product.numReviews} reviews)</span>
          </div>

          {/* Dynamic Name and Brand */}
          <h2 className='text-xl font-semibold text-gray-700 mb-2'>{product.name}</h2>
          <p className='text-sm text-gray-500 mb-2'>Brand: {product.brand}</p>

          {/* Dynamic Description */}
          <p className='text-gray-600 mb-4'>{product.description}</p>

          {/* Dynamic Price */}
          <div className='flex items-center mb-4'>
            <span className='text-2xl font-bold text-gray-800'>${product.price.toFixed(2)}</span>
            {/* You can add an originalPrice to your model for this */}
            {/* <span className='ml-2 text-lg text-gray-500 line-through'>$200.00</span> */}
          </div>

          <button className='w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition mb-4'>
            ADD TO CART
          </button>

          {/* Dynamic Stock Count */}
          <p className='text-gray-600'>
            <span className='font-semibold'>AVAILABLE:</span> {product.countInStock}
          </p>

          {/* Countdown Timer */}
          <div className='my-4'>
            <p className='font-semibold text-gray-700 mb-2'>HURRY UP! OFFER ENDS IN:</p>
            <div className='flex justify-between max-w-xs'>
              <div className='text-center'>
                <div className='text-2xl font-bold'>{timeLeft.hours}</div>
                <div className='text-sm'>Hours</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>{timeLeft.minutes}</div>
                <div className='text-sm'>Min</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>{timeLeft.seconds}</div>
                <div className='text-sm'>Sec</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DealOfTheDay

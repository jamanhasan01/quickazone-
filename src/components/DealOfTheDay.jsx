'use client'
import { useState, useEffect } from 'react'

const DealOfTheDay = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
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
  }, [])

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>Deal Of The Day</h1>

      <div className='flex mb-4'>
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-2xl ${i < 3 ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>

      <h2 className='text-xl font-semibold text-gray-700 mb-2'>
        SHAMPOO, CONDITIONER & FACEWASH PACKS
      </h2>

      <p className='text-gray-600 mb-4'>
        Lorem ipsum dolor sit amet consectetur lorem ipsum dolor dolor sit amet consectetur lorem
        ipsum dolor
      </p>

      <div className='flex items-center mb-4'>
        <span className='text-2xl font-bold text-gray-800'>$150.00</span>
        <span className='ml-2 text-lg text-gray-500 line-through'>$200.00</span>
      </div>

      <button className='w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition mb-4'>
        ADD TO CART
      </button>

      <p className='text-gray-600 mb-4'>
        <span className='font-semibold'>ALREADY SOLD:</span> 20
      </p>

      <div className='mb-4'>
        <p className='font-semibold text-gray-700 mb-2'>HURRY UP! OFFER ENDS IN:</p>
        <div className='flex justify-between'>
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

      <p className='text-gray-600'>
        <span className='font-semibold'>AVAILABLE:</span> 40
      </p>
    </div>
  )
}

export default DealOfTheDay
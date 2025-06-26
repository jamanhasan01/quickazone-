'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
console.log(cartItems);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('/api/cart', { cache: 'no-store' })
        const data = await res.json()

        if (res.ok && data.products?.items) {
          setCartItems(data.products.items)
        } else {
          setCartItems([])
        }
      } catch (err) {
        console.error('Failed to fetch cart:', err)
        setCartItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [cartItems])

  return (
    <div className='p-2'>
      <h3 className='text-lg font-semibold mb-3'>Your Shopping Cart</h3>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length > 0 ? (
        <ul className='space-y-2'>
          {cartItems.map((item) => {
            const product = item.productId
            return (
              <li key={item._id} className='flex gap-3 items-center border border-gray-200 p-2'>
                <Image
                  src={product?.image}
                  alt={product?.name}
                  width={50}
                  height={50}
                  className='rounded object-cover w-16 h-16'
                />
                <div className='flex-1'>
                  <p className='font-medium'>{product.name}</p>
                  <p className='text-sm text-gray-500'>
                    Price: ${product.price} × {item.quantity}
                  </p>
                    <p className='font-semibold'>${(product.price * item.quantity).toFixed(2)}</p>
                </div>
              
              </li>
            )
          })}
        </ul>
      ) : (
        <p className='text-gray-500'>Your cart is empty.</p>
      )}
    </div>
  )
}

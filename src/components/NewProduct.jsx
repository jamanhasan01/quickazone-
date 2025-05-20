'use client'
import ProductCard from '@/components/products/Cards/ProductCard'
import { useEffect, useState } from 'react'

const NewProduct = () => {
  const [products, setproducts] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => setproducts(json))
  }, [])

  return (
    <section className='my-20 shadow p-5'>
      <h4 className='h4 mb-4'>New Products</h4>
      <div className='grid grid-cols-4 gap-5'>
        {products.slice(0, 12).map((product, i) => (
          <ProductCard key={i} product={product}></ProductCard>
        ))}
      </div>
    </section>
  )
}

export default NewProduct

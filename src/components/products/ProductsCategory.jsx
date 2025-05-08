'use client'

import { useEffect, useState } from 'react'
import NewArribals from './NewArribals'
import Trending from './Trending'
import TopRated from './TopRated'
const ProductsCategory = () => {
  const [products, setproducts] = useState([])
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => setproducts(json))
  }, [])


  return (
    <div className='grid grid-cols-3 p-5 shadow'>
      <div className=' space-y-2 space-x-2'>
        <h3 className='h4'>New Arribals</h3>
        {products.slice(0, 10).map((product) => (
          <NewArribals key={product.id} product={product}></NewArribals>
        ))}
      </div>
      <div  className=' space-y-2 space-x-2'>
      <h3 className='h4'>Trending</h3>
        {products.slice(11, 20).map((product) => (
          <Trending key={product.id} product={product}></Trending>
        ))}
    
      </div>
      <div  className=' space-y-2 space-x-2'>
      <h3 className='h4'>TopRated</h3>
        {products.slice(0, 10).map((product) => (
              <TopRated product={product}></TopRated>
        ))}
      </div>
    </div>
  )
}

export default ProductsCategory

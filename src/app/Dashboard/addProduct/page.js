'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categoryOptions = [
  'Electronics',
  'Fashion & Apparel',
  'Home & Kitchen',
  'Health & Beauty',
  'Books & Media',
  'Sports & Outdoors',
  'Toys & Games',
  'Automotive',
  'Groceries',
  'Pet Supplies',
]

export default function AddProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    brand: '',
    category: categoryOptions[0],
    countInStock: '',
    description: '',
    images: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const productData = {
        ...formData,
        images: formData.images.split(',').map((url) => url.trim()),
        price: parseFloat(formData.price),
        countInStock: parseInt(formData.countInStock, 10),
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }

      alert('Product created successfully!')
      // router.push('/admin/products')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // --- Style Definition for Inputs ---
  // We define the styles here to easily reuse them across all inputs.
  const inputStyle =
    'mt-1 block w-full rounded-lg border-gray-300 bg-white p-2.5 text-gray-700 shadow-sm transition-all duration-200 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'

  return (
    <div className='wrapper max-w-2xl mx-auto py-10 px-4 sm:px-0'>
      <h1 className='text-3xl font-bold text-gray-800 mb-2'>Create New Product</h1>
      <p className='text-gray-600 mb-8'>
        Fill out the details below to add a new product to your catalog.
      </p>

      {error && <p className='bg-red-100 text-red-700 p-3 rounded-md mb-4'>{error}</p>}

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Name */}
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
            Product Name
          </label>
          {/* MODIFIED */}
          <input
            type='text'
            name='name'
            id='name'
            required
            value={formData.name}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Price & Stock */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
              Price ($)
            </label>
            {/* MODIFIED */}
            <input
              type='number'
              name='price'
              id='price'
              required
              step='0.01'
              value={formData.price}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor='countInStock' className='block text-sm font-medium text-gray-700'>
              Count In Stock
            </label>
            {/* MODIFIED */}
            <input
              type='number'
              name='countInStock'
              id='countInStock'
              required
              value={formData.countInStock}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Brand & Category */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='brand' className='block text-sm font-medium text-gray-700'>
              Brand
            </label>
            {/* MODIFIED */}
            <input
              type='text'
              name='brand'
              id='brand'
              required
              value={formData.brand}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
              Category
            </label>
            {/* MODIFIED */}
            <select
              name='category'
              id='category'
              required
              value={formData.category}
              onChange={handleChange}
              className={inputStyle}
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          {/* MODIFIED */}
          <textarea
            name='description'
            id='description'
            required
            rows='4'
            value={formData.description}
            onChange={handleChange}
            className={inputStyle}
          ></textarea>
        </div>

        {/* Images */}
        <div>
          <label htmlFor='images' className='block text-sm font-medium text-gray-700'>
            Image URLs
          </label>
          <p className='text-xs text-gray-500 mb-1'>
            Enter multiple image URLs separated by commas.
          </p>
          {/* MODIFIED */}
          <input
            type='text'
            name='images'
            id='images'
            required
            value={formData.images}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Submit Button */}
        <div>
          {/* MODIFIED Button for better visual weight */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
          >
            {isLoading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

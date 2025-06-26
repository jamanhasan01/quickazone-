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
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setMessage('')

    const formData = new FormData(e.target)
    const file = formData.get('file')

    // --- STEP 1: Validate the file ---
    if (!file || file.size === 0) {
      setErrors({ file: 'Please select a product image.' })
      setIsLoading(false)
      return
    }

    let photoURL = null

    try {
      // --- STEP 2: Upload the image to /api/upload ---
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const uploadData = await uploadRes.json()

      if (!uploadRes.ok) {
        setErrors({ file: uploadData.message || 'Image upload failed.' })
        setIsLoading(false)
        return
      }

      photoURL = uploadData.imageUrl // Get the URL from the upload response
    } catch (uploadError) {
      console.error('Image upload client-side/network error:', uploadError)
      setErrors({ file: 'Failed to upload image. Please try again.' })
      setIsLoading(false)
      return
    }

    // --- STEP 3: Prepare and send the final product data ---
    const product_data = {
      product_name: formData.get('product_name'),
      product_price: parseFloat(formData.get('product_price')),
      countInStock: parseInt(formData.get('countInStock'), 10),
      brand: formData.get('brand'),
      category: formData.get('category'),
      description: formData.get('description'),
      photoURL: photoURL, // Use the uploaded image URL
    }

    try {
      const productRes = await fetch('/api/products', {
        // Assumes a '/api/products' endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product_data),
      })

      const newProduct = await productRes.json()

      if (!productRes.ok) {
        // Handle potential validation errors from the server
        if (productRes.status === 400) {
          setErrors(newProduct.errors || {})
        }
        setMessage(newProduct.message || 'Failed to create product.')
        setIsLoading(false)
        return
      }

      // --- STEP 4: Handle success ---
      setMessage('Product created successfully!')
      // Redirect to the new product's page or a general products page
      router.push(`/products/${newProduct.id}`) // Assuming the response contains the new product's ID
    } catch (error) {
      console.error('Product creation error:', error)
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='wrapper max-w-2xl mx-auto py-10 px-4 sm:px-0'>
      <h1 className='text-3xl font-bold text-gray-800 mb-2'>Create New Product</h1>
      <p className='text-gray-600 mb-8'>
        Fill out the details below to add a new product to your catalog.
      </p>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Product Name */}
        <div>
          <label htmlFor='product_name' className='block text-sm font-medium text-gray-700'>
            Product Name
          </label>
          <input type='text' name='product_name' id='product_name' className='input' required />
          {errors.product_name && (
            <p className='text-red-500 text-xs mt-1'>{errors.product_name}</p>
          )}
        </div>

        {/* Price & Stock */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='product_price' className='block text-sm font-medium text-gray-700'>
              Price ($)
            </label>
            <input
              type='number'
              name='product_price'
              id='product_price'
              required
              step='0.01'
              className='input'
            />
            {errors.product_price && (
              <p className='text-red-500 text-xs mt-1'>{errors.product_price}</p>
            )}
          </div>
          <div>
            <label htmlFor='countInStock' className='block text-sm font-medium text-gray-700'>
              Count In Stock
            </label>
            <input type='number' name='countInStock' id='countInStock' required className='input' />
            {errors.countInStock && (
              <p className='text-red-500 text-xs mt-1'>{errors.countInStock}</p>
            )}
          </div>
        </div>

        {/* Brand & Category */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='brand' className='block text-sm font-medium text-gray-700'>
              Brand
            </label>
            <input type='text' name='brand' id='brand' className='input' required />
            {errors.brand && <p className='text-red-500 text-xs mt-1'>{errors.brand}</p>}
          </div>
          <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
              Category
            </label>
            <select name='category' id='category' required className='input'>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.category && <p className='text-red-500 text-xs mt-1'>{errors.category}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            name='description'
            id='description'
            required
            className='input'
            rows='4'
          ></textarea>
          {errors.description && <p className='text-red-500 text-xs mt-1'>{errors.description}</p>}
        </div>

        {/* Image */}
        <div>
          <label htmlFor='file' className='block text-sm font-medium text-gray-700'>
            Product Image
          </label>
          <input type='file' name='file' id='file' required className='file-input' accept='image/*' />
          {errors.file && <p className='text-red-500 text-xs mt-1'>{errors.file}</p>}
        </div>

        {/* Global Message Display */}
        {message && (
          <p className={`text-sm ${errors.length > 0 ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}

        <div>
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

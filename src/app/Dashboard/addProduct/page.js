'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    brand: '',
    category: '',
    countInStock: '',
    description: '',
    images: '', // We'll handle this as a comma-separated string of URLs for simplicity
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // A single handler for all form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    setError(null);

    try {
      // Prepare the data for submission
      const productData = {
        ...formData,
        // Convert comma-separated image URLs into an array
        images: formData.images.split(',').map(url => url.trim()),
        price: parseFloat(formData.price),
        countInStock: parseInt(formData.countInStock, 10),
      };
      console.log('log productData data', productData);
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      // If successful, redirect to an admin products list page
      alert('Product created successfully!');
      router.push('/admin/products');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Product</h1>
      
      {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main focus:ring-main" />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input type="number" name="price" id="price" required step="0.01" value={formData.price} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main focus:ring-main" />
          </div>
          <div>
            <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700">Count In Stock</label>
            <input type="number" name="countInStock" id="countInStock" required value={formData.countInStock} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main focus:ring-main" />
          </div>
        </div>

        {/* Brand & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input type="text" name="brand" id="brand" required value={formData.brand} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main focus:ring-main" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" name="category" id="category" required value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main focus:ring-main" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" required rows="4" value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main focus:ring-main"></textarea>
        </div>
        
        {/* Images */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Image URLs</label>
          <p className="text-xs text-gray-500 mb-1">Enter multiple image URLs separated by commas.</p>
          <input type="text" name="images" id="images" required value={formData.images} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main focus:ring-main" />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main disabled:bg-gray-400">
            {isLoading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
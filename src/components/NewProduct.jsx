import ProductCard from '@/components/products/Cards/ProductCard' // Assuming this path is correct

const NewProduct = async () => {
  let products = []

  try {
    const res = await fetch('http://localhost:3000/api/products')

    if (!res.ok) {
      console.error(`API fetch failed with status: ${res.status}`)

      return (
        <section className='my-20 p-5 text-center text-red-600'>
          <h4 className='h4 mb-4'>New Products</h4>
          <p>Failed to load new products. Please try again later.</p>
        </section>
      )
    }

    const result = await res.json()

    if (result.success && Array.isArray(result.data)) {
      products = result.data
    } else {
      console.warn('API returned success: false or data is not an array:', result.message)
    }
  } catch (error) {
    console.error('Error fetching new products:', error)

    return (
      <section className='my-20 p-5 text-center text-red-600'>
        <h4 className='h4 mb-4'>New Products</h4>
        <p>An error occurred while fetching products. Please try again later.</p>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className='my-20 p-5 text-center text-gray-600'>
        <h4 className='h4 mb-4'>New Products</h4>
        <p>No new products found at the moment.</p>
      </section>
    )
  }

  return (
    <section className=' '>
      <div className='wrapper'>
        <h4 className='h4 mb-4'>New Products</h4>
        <div className='grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
          {' '}
          {/* Added responsive grid classes */}
          {products.slice(0, 12).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewProduct

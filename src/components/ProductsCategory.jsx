import SimpleProductCard from './products/Cards/SimpleProductCard'

const ProductsCategory = async () => {
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
    <div className='wrapper'>
      <div className='grid grid-cols-3 p-5 shadow'>
        <div className=' space-y-2 space-x-2'>
          <h3 className='h4'>New Arribals</h3>
          {products.slice(0, 10).map((product) => (
            <SimpleProductCard key={product._id} product={product}></SimpleProductCard>
          ))}
        </div>
        <div className=' space-y-2 space-x-2'>
          <h3 className='h4'>Trending</h3>
          {products.slice(0, 10).map((product) => (
            <SimpleProductCard key={product._id} product={product}></SimpleProductCard>
          ))}
        </div>
        <div className=' space-y-2 space-x-2'>
          <h3 className='h4'>TopRated</h3>
          {products.slice(0, 10).map((product) => (
            <SimpleProductCard key={product._id} product={product}></SimpleProductCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsCategory

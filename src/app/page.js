import AsideCategory from '@/components/AsideCategory'
import Banner from '@/components/Banner'
import ProductsCategory from '@/components/products/ProductsCategory'

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <div className='grid grid-cols-12 gap-5 wrapper'>
        <div className='col-span-4'>
          {' '}
          <AsideCategory />
        </div>
        <div className='col-span-8 '>
          <ProductsCategory/>
        </div>
      </div>
    </>
  )
}

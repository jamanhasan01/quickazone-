import AsideCategory from '@/components/AsideCategory'
import Banner from '@/components/Banner'
import NewProduct from '@/components/NewProduct'
import ProductsCategory from '@/components/ProductsCategory'
import SuperDeal from '@/components/DealOfTheDay'

export default async function Home() {
  return (
    <>
      <section className='mt-20'>
        <Banner></Banner>
        <div className='grid grid-cols-12 gap-5 wrapper'>
          <div className='col-span-4'>
            {' '}
            <AsideCategory />
          </div>
          <div className='col-span-8 '>
            <ProductsCategory />
            <NewProduct></NewProduct>
            <SuperDeal></SuperDeal>
          </div>
        </div>
      </section>
    </>
  )
}

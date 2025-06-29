import DealOfTheDay from '@/components/DealOfTheDay'
import HeroSection from '@/components/HeroSection'
import NewProduct from '@/components/NewProduct'
import ProductsCategory from '@/components/ProductsCategory'

export default async function Home() {
  return (
    <>
      <div className=''>
        <HeroSection></HeroSection>
        <NewProduct></NewProduct>
        <DealOfTheDay></DealOfTheDay>
        <ProductsCategory></ProductsCategory>
      </div>
    </>
  )
}

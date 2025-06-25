import HeroSection from '@/components/HeroSection'
import NewProduct from '@/components/NewProduct'

export default async function Home() {
  return (
    <>
      <div className=''>
        <HeroSection></HeroSection>
        <NewProduct></NewProduct>
      </div>
    </>
  )
}

// components/HeroSection.tsx
import Image from 'next/image'
import Link from 'next/link'
import heroImg from '../../public/banner/hero-image.png' // Assuming this is a relevant eCommerce image

export default function HeroSection() {
  return (
    <section className='relative w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100'>
      {' '}
      {/* Added py-16 md:py-24 back for consistent padding */}
      <div className='wrapper mx-auto flex flex-col items-center justify-between gap-12 px-6 lg:flex-row lg:px-8'>
        {/* left content */}
        <div className='relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left'>
          <h1 className='mb-6 max-w-2xl font-extrabold leading-tight text-gray-900 text-4xl md:text-5xl lg:text-6xl animate-fade-in-up'>
            Discover Your Next Favorite <span className='text-blue-600'>Product</span>
          </h1>
          <p className='mb-8 max-w-xl text-lg text-gray-700 md:text-xl animate-fade-in-up delay-100'>
            Explore our curated collection of high-quality items, from electronics to fashion, all
            at unbeatable prices. Your perfect find is just a click away!
          </p>
          <div className='flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200'>
            <Link href='/products' passHref>
              {' '}
              {/* Link to a general products page */}
              <button className='rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg'>
                Shop Now
              </button>
            </Link>
            <Link href='/categories' passHref>
              {' '}
              {/* Link to categories or deals page */}
              <button className='rounded-full border border-blue-600 bg-transparent px-8 py-3 font-semibold text-blue-600 shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg'>
                Browse Categories
              </button>
            </Link>
          </div>
        </div>

        {/* right image */}
        <div className='relative z-0 mt-12 lg:mt-0 animate-fade-in-right'>
          <Image
            src={heroImg}
            width={500} // Increased width/height slightly for better visual impact as discussed previously
            height={500}
            alt='E-commerce shopping illustration with various products' // Updated alt text
            className='rounded-lg  transition-transform duration-500 hover:scale-105' // Added shadow and rounded-lg back
            priority
          />
          {/* Optional: Add an overlay or subtle background element to the image */}
          <div className='absolute inset-0 -z-10 transform rounded-lg bg-blue-200 opacity-30 blur-xl'></div>
        </div>
      </div>
      {/* Optional: Add some background shapes for visual interest */}
      <div className='absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-300 opacity-20 blur-3xl'></div>
      <div className='absolute -top-24 -right-24 h-80 w-80 rounded-full bg-indigo-300 opacity-20 blur-3xl'></div>
    </section>
  )
}

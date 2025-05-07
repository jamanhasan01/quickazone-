'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import Image from 'next/image'
import banner1 from '../../public/banner/banner1.jpg'
import banner2 from '../../public/banner/banner2.jpg'
import banner3 from '../../public/banner/banner3.jpg'
import 'swiper/css'
import 'swiper/css/navigation'

export default function Banner() {
  // ✅ Capitalized component name
  const bannerArr = [banner1, banner2, banner3]

  return (
    <section>
      <div className='wrapper h-[calc(100vh-40px)] !py-10 overflow-hidden'>
        <Swiper
          className='w-full h-full rounded-2xl overflow-hidden'
          navigation={true}
          modules={[Navigation, Autoplay]} // Added Autoplay module
          autoplay={{
            delay: 3000, // 3 seconds between slides
            disableOnInteraction: false, // Continue autoplay after user interaction
            pauseOnMouseEnter: true, // Pause on hover
          }}
          loop={true} // Enable infinite loop
        >
          {bannerArr.map((banner, index) => (
            <SwiperSlide key={index}>
              {' '}
              {/* Key moved here */}
              <div className='w-full h-full '>
                {' '}
                {/* Added relative */}
                <Image
                  src={banner}
                  alt={`Banner ${index + 1}`}
                  fill
                  className=' object-fill'
                  sizes='100vw'
                  unoptimized={true}
                  priority={index === 0} // Only first image has priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

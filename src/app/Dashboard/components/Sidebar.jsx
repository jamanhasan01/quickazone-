'use client'
import AsideItem from './AsideItem'
// --- IMPORT THE NEW ICON HERE ---
import { FaCartPlus, FaChevronRight, FaHome, FaArrowLeft } from 'react-icons/fa'
import useSidebar from '../hooks/useSidebar'
import { FaChevronLeft } from 'react-icons/fa6'
import Link from 'next/link'

const Sidebar = () => {
  let { expanded, setexpanded } = useSidebar()

  return (
    <aside
      className={`fixed left-0 top-0 bg-main ${
        expanded ? 'w-72 p-3' : 'w-20 p-2'
      } h-screen text-white z-10 transition-all duration-300`}
    >
      {/* --- "GO BACK" ICON REMOVED FROM HERE --- */}
      <div className='flex items-center justify-center pb-4 mb-4 border-b'>
        {/* Animate the logo's appearance */}
        <h2
          className={`font-semibold text-2xl overflow-hidden transition-all duration-300 ${
            expanded ? 'w-auto' : 'w-0'
          }`}
        >
          Quickazone
        </h2>
      </div>

      <nav className='h-full flex flex-col'> {/* Use flex-col here */}
        {/* Correctly centered the button and made its position consistent */}
        <button
          onClick={() => setexpanded(!expanded)}
          className='absolute top-1/2 -translate-y-1/2 -right-3 bg-white text-main border rounded-full p-1.5 text-xl transition-all hover:cursor-pointer z-20'
        >
          {expanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        {/* --- THE CHANGE IS IN THIS UL --- */}
        <ul className='flex-grow flex flex-col gap-2'> {/* Use flex-grow to take available space */}
          <AsideItem href={'/dashboard'} text={'Dashboard'} icon={<FaHome size={20} />} />
          <AsideItem
            href={'/dashboard/addProduct'}
            text={'Add Product'}
            icon={<FaCartPlus size={20} />}
          />
          {/* Use a separator for visual distinction */}
          <div className="my-2 border-b border-white/20"></div>

          {/* --- vvv NEW "GO BACK" LIST ITEM vvv --- */}
          <AsideItem
            href={'/'}
            text={'Go Back'}
            icon={<FaArrowLeft size={20} />}
          />
          {/* --- ^^^ NEW "GO BACK" LIST ITEM ^^^ --- */}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
'use client'

import { FiSearch, FiShoppingCart } from 'react-icons/fi'
import { FaUserTie } from 'react-icons/fa6'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import GlobalLoader from './GlobalLoader'
import Image from 'next/image'
import Cart from './Cart'
import getCartData from '@/hooks/getCartData'
import NavCart from './NavCart'

export default  function Navbar() {
  const [showCard, setshowCard] = useState(false)
  const [showProfile, setshowProfile] = useState(false)
  const [isScroll, setisScroll] = useState(false)
  let pathname = usePathname()
  const { user, isLoading, authStatus } = useCurrentUser()


  // onscroll every trigger funtion for nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setisScroll(true)
      } else {
        setisScroll(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isLoading == true) {
    return <GlobalLoader></GlobalLoader>
  }

  if (
    !pathname.includes('register') &&
    !pathname.includes('login') &&
    !pathname.includes('dashboard')
  ) {
    return (
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScroll ? 'bg-white/70 shadow-md backdrop-blur-md' : 'bg-transparent' // Use isScrolled for styling
        }`}
      >
        <div className='wrapper !p-0'>
          <div className='flex justify-between h-16'>
            {/* Left side - Logo */}
            <div className='flex  items-center'>
              <Link href='/' className='text-2xl font-semibold text-main '>
                Quickazone
              </Link>
            </div>

            {/* Center - Search Bar */}
            <div className='flex  items-center justify-center px-2'>
              <div className='w-full max-w-lg lg:w-lg'>
                <label htmlFor='search' className='sr-only'>
                  Search
                </label>
                <div className='relative'>
                  <button className='absolute inset-y-0 right-0 flex items-center px-3 bg-main justify-center rounded-r-md'>
                    <FiSearch className='h-5 w-5 text-white' />
                  </button>
                  <input
                    id='search'
                    name='search'
                    className='block w-full rounded-md border-0 bg-gray-50 py-1.5 pl-3 pr-10 outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
                    placeholder='Search in Quickazone...'
                    type='search'
                  />
                </div>
              </div>
            </div>

            {/* Right side - Shopping cart and avatar / login button */}
            <div className='flex items-center gap-3'>
              {user ? (
                <div className='flex items-center space-x-3 '>
               <NavCart showCard={showCard} setshowCard={setshowCard}></NavCart>
                  {/* user  */}
                  <button onClick={() => setshowProfile(!showProfile)} className=''>
                    {user?.photoURL ? (
                      <Image
                        className='border-2 cursor-pointer rounded-full p-1 border-main w-12 h-12'
                        src={user?.photoURL}
                        alt='User Profile'
                        width={300}
                        height={300}
                      />
                    ) : (
                      <FaUserTie className='text-main text-2xl border-2 cursor-pointer rounded-full p-1 border-main w-12 h-12' />
                    )}
                  </button>
                </div>
              ) : (
                <div className=''>
                  <button className='button !bg-transparent !text-main'>
                    <Link href={'/login'}>Sign-In</Link>
                  </button>
                  <button className='button !bg-transparent !text-main'>
                    <Link href={'/register'}>Register</Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* -------------models----------------- */}

        {/* dropdown card items */}
        {showCard && (
          <div className=' absolute bg-white shadow-md p-2  w-2xs right-5 top-20'>
            <Cart></Cart>
          </div>
        )}

        {/* -------------------- vvv THE CHANGE IS HERE vvv -------------------- */}
        {/* dropdown profile items */}
        {showProfile && (
          <div className='absolute bg-white rounded-md shadow-lg w-48 right-5 top-20 '>
            <ul className='py-1 divide-y divide-gray-200'>
              {/* Profile Info Header */}
              <li className='px-4 py-3'>
                <p className='text-sm text-gray-900'>Signed in as</p>
                <p className='text-sm font-medium text-gray-900 truncate'>{user?.email}</p>
              </li>

              {/* Dashboard Link */}
              <li>
                <Link
                  href='/dashboard'
                  className='block px-4 py-2 texWWWWWt-sm text-gray-700 hover:bg-gray-100'
                >
                  Dashboard
                </Link>
              </li>

              {/* Logout Button */}
              <li>
                <button
                  onClick={signOut}
                  className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        {/* -------------------- ^^^ THE CHANGE IS HERE ^^^ -------------------- */}
      </nav>
    )
  }
}

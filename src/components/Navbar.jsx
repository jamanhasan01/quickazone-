"use client"; // Required for client-side interactivity

import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [showCard, setshowCard] = useState(false);
  const [showProfile, setshowProfile] = useState(false);
  let pathname=usePathname()
if(!pathname.includes('sign-in') && !pathname.includes('sign-up')){
  

  return (
    <nav className="bg-white shadow-sm fixed top-0 z-50  w-full">
      <div className="wrapper !p-0">
        <div className="flex justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex  items-center">
            <Link href="/" className="text-2xl font-semibold text-main ">
              Quickazone
            </Link>
          </div>

          {/* Center - Search Bar */}
          <div className="flex  items-center justify-center px-2">
            <div className="w-full max-w-lg lg:w-lg">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <button className="absolute inset-y-0 right-0 flex items-center px-3 bg-main justify-center rounded-r-md">
                  <FiSearch className="h-5 w-5 text-white" />
                </button>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border-0 bg-gray-50 py-1.5 pl-3 pr-10 outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  placeholder="Search in Quickazone..."
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Right side - Shopping cart and avatar / login button */}
          <div className="flex items-center gap-3">
            {/* this div wrap shoping card & user profile */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setshowCard(!showCard)}
                className=" rounded-full relative mt-2 cursor-pointer bg-white p-1 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only r">View cart</span>
                <FiShoppingCart className="h-6 w-6 text-main" />
                <span className="absolute -top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-main rounded-full">
                  3 {/* Replace with actual cart count */}
                </span>
              </button>
              {/* user  */}
              <button   onClick={() => setshowProfile(!showProfile)} className="border-2 cursor-pointer rounded-full p-1 border-main">
                <FaUserTie className="text-main text-2xl" />
              </button>
            </div>
            {/* button for login and register */}
            <div className=" space-x-2 hidden">
              <button className="button">
                <Link href={"/sign-in"}>Sign-In</Link>
              </button>
              <button className="button">
                <Link href={"/sign-up"}>Register</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

{/* -------------models----------------- */}

      {/* dropdown card items */}
      {showCard && (
        <div className=" absolute bg-white shadow-md p-2  w-2xs right-5 top-20">card</div>
      )}
      {/* dropdown card items */}
      {showProfile && (
        <div className=" absolute bg-white shadow-md p-2  w-2xs right-5 top-20">profile</div>
      )}
    </nav>
  );
  }
}

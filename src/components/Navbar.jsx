"use client"; // Required for client-side interactivity

import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [showCard, setshowCard] = useState(false);
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center text-primary">
            <Link href="/" className="text-2xl font-semibold ">
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
                <button className="absolute inset-y-0 right-0 flex items-center px-3 bg-primary justify-center rounded-r-md">
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

          {/* Right side - Shopping cart and avatar */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setshowCard(!showCard)}
              className="relative rounded-full  bg-white p-1 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View cart</span>
              <FiShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
                3 {/* Replace with actual cart count */}
              </span>

              {/* dropdown card items */}
              {showCard && (
                <div className=" absolute bg-white shadow-md p-2  w-2xs right-0 top-14"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

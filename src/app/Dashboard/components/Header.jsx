/ src/components/sidebar.jsx
'use client';

import { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  FiLayout,
  FiUsers,
  FiShoppingCart,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiMoreVertical,
} from 'react-icons/fi';
import Link from 'next/link';

// Create a context for the sidebar state
const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`h-screen fixed top-0 left-0 z-10 md:relative`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        {/* Header section of the sidebar */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? 'w-32' : 'w-0'
            }`}
            alt="Company Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
        </div>

        {/* Main navigation items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            <SidebarItem
              icon={<FiLayout size={20} />}
              text="Dashboard"
              href="/dashboard"
            />
            <SidebarItem
              icon={<FiUsers size={20} />}
              text="Users"
              href="/dashboard/users"
            />
            <SidebarItem
              icon={<FiShoppingCart size={20} />}
              text="Orders"
              href="/dashboard/orders"
              alert
            />
            <SidebarItem
              icon={<FiBarChart2 size={20} />}
              text="Analytics"
              href="/dashboard/analytics"
            />
            <SidebarItem
              icon={<FiSettings size={20} />}
              text="Settings"
              href="/dashboard/settings"
            />
          </ul>
        </SidebarContext.Provider>

        {/* User profile section */}
        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Jane+Doe"
            alt="User Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Jane Doe</h4>
              <span className="text-xs text-gray-600">janedoe@gmail.com</span>
            </div>
            <FiMoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

// SidebarItem component for individual navigation links
export function SidebarItem({ icon, text, href, alert }) {
  const { expanded } = useContext(SidebarContext);
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href}>
      <li
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            active
              ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
              : 'hover:bg-indigo-50 text-gray-600'
          }
      `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? 'w-52 ml-3' : 'w-0'
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? '' : 'top-2'
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

// src/components/header.jsx
'use client';

import { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiMic } from 'react-icons/fi';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex-1 flex items-center justify-between p-4 bg-white border-b">
      {/* Search Bar */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="search"
            name="search"
            className="w-full py-2 pl-10 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search..."
          />
           <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <FiMic className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
          </span>
        </div>
      </div>

      {/* Right side icons and profile */}
      <div className="flex items-center space-x-4 ml-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FiBell className="h-6 w-6 text-gray-600" />
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FiUser className="h-6 w-6 text-gray-600" />
          </button>
          
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20">
              <Link href="/dashboard/profile">
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">Profile</a>
              </Link>
              <Link href="/dashboard/settings">
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">Settings</a>
              </Link>
              <div className="border-t border-gray-200"></div>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

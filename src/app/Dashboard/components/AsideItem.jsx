"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useSidebar from '../hooks/useSidebar'

const AsideItem = ({ href, text, icon }) => {
   let {  expanded,setexpanded } = useSidebar()
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link href={href}>
      <li
        className={`
                flex items-center gap-3 p-3 my-1 mx-2 rounded-lg
                font-medium cursor-pointer transition-colors
                ${
                  active
                    ? 'bg-white text-blue-600' 
                    : 'text-white hover:bg-white/10' 
                }
            `}
      >
        <span>{icon}</span>
      { expanded && <h3>{text}</h3>}
      </li>
    </Link>
  )
}

export default AsideItem

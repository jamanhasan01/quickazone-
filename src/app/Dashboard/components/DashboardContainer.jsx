// ./src/app/dashboard/components/DashboardContainer.jsx
'use client'
import useSidebar from "../hooks/useSidebar"
import Sidebar from "./Sidebar"

 // This is our Client Component



const DashboardContainer = ({ children }) => {
  // Now this works, because SidebarProvider is above it in the tree!
  const { expanded } = useSidebar()

  return (
    <div className='flex'>
      <Sidebar />
      {/* Logic is now correct and in the right place */}
      <main className={`w-full transition-all duration-300 ${expanded ? 'ml-72' : 'ml-20'}`}>
        {children}
      </main>
    </div>
  )
}

export default DashboardContainer

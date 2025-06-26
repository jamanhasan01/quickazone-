import React from 'react'

import SidebarProvider from './context/SidebarProvider'

import DashboardContainer from './components/DashboardContainer'

const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <DashboardContainer>{children}</DashboardContainer>
    </SidebarProvider>
  )
}

export default DashboardLayout

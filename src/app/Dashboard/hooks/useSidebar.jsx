"use client"
import { useContext } from 'react'
import { SidebarContext } from '../context/SidebarProvider'

const useSidebar = () => {
  let context = useContext(SidebarContext)
  return context
}

export default useSidebar

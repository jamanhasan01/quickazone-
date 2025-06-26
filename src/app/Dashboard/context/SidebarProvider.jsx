"use client"
import {  createContext, useState } from "react"

export let SidebarContext=createContext()
const SidebarProvider = ({children}) => {
    const [expanded, setexpanded] = useState(true)
  return (
    <SidebarContext.Provider value={{expanded,setexpanded}}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider
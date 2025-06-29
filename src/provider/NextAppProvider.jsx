"use client"
import { createContext } from "react"


let nextAppContext=createContext()
const NextAppProvider = ({children}) => {
  return (
    <nextAppContext.Provider value={{}}>
        {children}
    </nextAppContext.Provider>
  )
}

export default NextAppProvider
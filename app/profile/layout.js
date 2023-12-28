"use client"
import { UserContextProvider, useUserProvider } from "@/context/UserContext"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
export default function RootLayout({ children }) {
  const {showSideBar} = useUserProvider()
  return (
    <div>
        {showSideBar && <Sidebar/>}
        <Navbar/>
        {children}
    </div>
  )
}

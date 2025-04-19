import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Body = () => {
  return (
    <div>
       <Navbar />
       <Outlet />
       <h1 className="text-3xl font-bold underline">Hello Baby</h1>
       <Footer />
    </div>
  )
}

export default Body

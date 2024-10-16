import React from 'react'
import Navigation from '../Components/Navigation'
import Footer from '../Components/Footer'
export default function LayOut() {
  return (
    <div>
      <Navigation/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

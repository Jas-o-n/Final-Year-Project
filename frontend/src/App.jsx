import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import BookingPopup from './components/BookingPopup/BookingPopup'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)
  const [showBooking,setShowBooking] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    {showBooking?<BookingPopup setShowBooking={setShowBooking} />:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          < Route path='/' element={<Home setShowBooking={setShowBooking} />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App

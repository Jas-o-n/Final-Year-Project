import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Bookings from './pages/Bookings/Bookings'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import BookingPopup from './components/BookingPopup/BookingPopup'
import { ToastContainer } from 'react-toastify'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)
  const [showBooking,setShowBooking] = useState(false)

  useEffect(() => {
    if (showBooking || showLogin) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
    return () => {
        document.body.classList.remove('no-scroll');
    };
}, [showBooking, showLogin]);

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    {showBooking?<BookingPopup setShowBooking={setShowBooking} />:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          < Route path='/' element={<Home setShowBooking={setShowBooking} />} />
          < Route path='/bookings' element={<Bookings />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App

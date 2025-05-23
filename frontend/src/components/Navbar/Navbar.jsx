import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { CircleUser, LogOut, CalendarSearch } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin, menu, setMenu}) => {

    const {token,setToken} = useContext(StoreContext)

    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
      localStorage.removeItem("token")
      setToken("")
      navigate("/")
    }

    const booking = () => {
      navigate("/bookings")
    }

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" onClick={() => { navigate('/'); setMenu("home"); }} style={{cursor: 'pointer'}} />
      {(location.pathname == '/bookings') ? ( 
        <ul className="navbar-menu">
          <Link to='/' onClick={()=>setMenu("home")} >Home</Link>
        </ul>
      ) : (
        <ul className="navbar-menu">
          <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
          <a href='#product-display' onClick={()=>setMenu("products")} className={menu==="products"?"active":""}>Products</a>
          <a href='#book-appointment' onClick={()=>setMenu("book-appointment")} className={menu==="book-appointment"?"active":""}>Book an Appointment</a>
          <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
        </ul>
      )}
      <div className="navbar-right">
        {!token?<button onClick={()=>setShowLogin(true)}>sign in / register</button>
        :<div className='navbar-profile'>
           <CircleUser size={40} />
           <ul className="navbar-profile-dropdown">
            <li onClick={booking}>
              <CalendarSearch />
              <p>Bookings</p>
            </li>
            <li onClick={logout}>
              <LogOut />
              <p>Logout</p>
            </li>
           </ul>
          </div>}
      </div>
    </div>
  )
}

export default Navbar

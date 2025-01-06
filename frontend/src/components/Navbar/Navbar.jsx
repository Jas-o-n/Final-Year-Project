import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href='#product-display' onClick={()=>setMenu("products")} className={menu==="products"?"active":""}>products</a>
        <a href='#book-appointment' onClick={()=>setMenu("book-appointment")} className={menu==="book-appointment"?"active":""}>book appointment</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <button onClick={()=>setShowLogin(true)}>sign in / register</button>
      </div>
    </div>
  )
}

export default Navbar

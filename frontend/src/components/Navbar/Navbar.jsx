import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { CircleUser, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");

    const {token,setToken} = useContext(StoreContext)

    const navigate = useNavigate()

    const logout = () => {
      localStorage.removeItem("token")
      setToken("")
      navigate("/")
    }

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
        {!token?<button onClick={()=>setShowLogin(true)}>sign in / register</button>
        :<div className='navbar-profile'>
           <CircleUser size={40} />
           <ul className="navbar-profile-dropdown">
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

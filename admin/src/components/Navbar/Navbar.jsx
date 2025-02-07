import React from 'react'
import "./Navbar.css"
import {assets} from '../../assets/assets'
import { CircleUser, LogOut } from 'lucide-react'

const Navbar = ({frontendUrl}) => {

  const logout = () => {
    window.location.href = frontendUrl
  }

  return (
    <div>
      <div className="navbar">
        <img className='logo' src={assets.logo} alt="" />
        <div className="navbar-profile">
          <CircleUser size={40} />
          <ul className="navbar-profile-dropdown">
            <li onClick={logout}>
            <LogOut />
            <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar

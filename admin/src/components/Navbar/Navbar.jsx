import React from 'react'
import "./Navbar.css"
import {assets} from '../../assets/assets'

const Navbar = ({frontendUrl}) => {

  const logout = () => {
    window.location.href = frontendUrl
  }

  return (
    <div>
      <div className="navbar">
        <img className='logo' src={assets.logo} alt="" />
        <div className="navbar-profile">
          <img className='profile' src={assets.profile_icon} alt="" />
          <ul className="navbar-profile-dropdown">
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar

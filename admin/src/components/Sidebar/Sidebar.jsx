import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/AddProducts' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/ListProducts' className="sidebar-option">
            <img src={assets.list_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/ListUsers' className="sidebar-option">
            <img src={assets.list_icon} alt="" />
            <p>List Users</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar

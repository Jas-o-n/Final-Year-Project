import React from 'react'
import "./Sidebar.css"
import { NavLink } from 'react-router-dom'
import { AlignLeft, CalendarSearch, Contact, ListPlus } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/AddProducts' className="sidebar-option">
            <ListPlus />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/ListProducts' className="sidebar-option">
            <AlignLeft />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/ListUsers' className="sidebar-option">
            <Contact />
            <p>List Users</p>
        </NavLink>
        <NavLink to='/ListBookings' className="sidebar-option">
            <CalendarSearch />
            <p>List Bookings</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar

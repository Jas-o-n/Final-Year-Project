import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProducts from './pages/AddProducts/AddProducts'
import ListProducts from './pages/ListProducts/ListProducts'
import ListUsers from './pages/ListUsers/ListUsers'
import ListBookings from './pages/ListBookings/ListBookings'
import ListQuotes from './pages/ListQuotes/ListQuotes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = import.meta.env.VITE_API_URL;
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

  return (
    <div>
      <ToastContainer/>
      <Navbar frontendUrl={frontendUrl}/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/AddProducts" element={<AddProducts url={url}/>}/>
          <Route path="/ListProducts" element={<ListProducts url={url}/>}/>
          <Route path="/ListUsers" element={<ListUsers url={url}/>}/>
          <Route path="/ListBookings" element={<ListBookings url={url}/>}/>
          <Route path="/ListQuotes" element={<ListQuotes url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

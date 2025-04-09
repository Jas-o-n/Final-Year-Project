import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = ({ setMenu }) => {
  const navigate = useNavigate()

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" className="logo" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio veritatis molestiae fugiat nostrum labore fugit consectetur illum modi, quis dolore debitis voluptates ex voluptate omnis sequi ipsum? Amet, officiis aliquid.</p>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
              setMenu("home");
            }} style={{cursor: 'pointer'}}>Home</li>
            <li>About us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>phonenumber</li>
            <li>contact@email.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright</p>
    </div>
  )
}

export default Footer

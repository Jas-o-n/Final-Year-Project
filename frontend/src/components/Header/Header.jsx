import React, { useState } from 'react'
import './Header.css'
import QuotePopup from '../QuotePopup/QuotePopup'

const Header = () => {
  const [showQuote, setShowQuote] = useState(false)

  return (
    <>
      <div className='header'>
        <div className="header-contents">
          <h2>Get a Quote from us!</h2>
          <p>Fast, reliable quotes tailored to your needs. Our expert team will help you find the perfect solution at competitive prices.</p>
          <button onClick={() => setShowQuote(true)}>Get Your Quote</button>
        </div>
      </div>
      {showQuote && <QuotePopup setShowQuote={setShowQuote} />}
    </>
  )
}

export default Header

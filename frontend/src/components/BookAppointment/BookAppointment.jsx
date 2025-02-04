import React from 'react'
import './BookAppointment.css'

const BookAppointment = ({setShowBooking}) => {
  return (
    <div className='book-appointment' id='book-appointment' >
        <p>Book an appointment <br/> Our dedicated team of experts can help you find insurance</p>
        <button onClick={()=>setShowBooking(true)} className='book-appointment-button'>Book Appointment</button>
    </div>
  )
}

export default BookAppointment

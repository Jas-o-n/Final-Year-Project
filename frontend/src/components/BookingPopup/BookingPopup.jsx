import React, { useEffect, useState } from 'react'
import './BookingPopup.css'
import { assets } from '../../assets/assets'

const BookingPopup = ({setShowBooking}) => {

  const daysOfWeek = ["SUN","MON","TUE","WED","THU","FRI","SAT"]

  const [bookingSlots,setBookingSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState(0)

  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const getAvailableSlots = async () => {
    // get current date
    let today = new Date()

    for(let i=0 ; i<7 ; i++) {
      // set current date
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      // set end time
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)
      // set hours
      if (today.getDate() === currentDate.getDate()) {
        if (currentDate.getHours() >= 10) {
          if (currentDate.getMinutes() > 30) {
            currentDate.setHours(currentDate.getHours() + 1);
            currentDate.setMinutes(0);
          } else {
            currentDate.setMinutes(30);
          }
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = []

      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setBookingSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(()=>{
    getAvailableSlots()
  },[])

  useEffect(()=>{
    setSlotTime(0)
  },[slotIndex])
  
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
  }

  const onBooking = async (event) => {
    event.preventDefault()
    setShowBooking(false)

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className='booking-popup'>    
      <form onSubmit={onBooking} className="booking-popup-container">
        <div className="booking-popup-title">
            <h2>Book an Appointment</h2>
            <img onClick={()=>setShowBooking(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="booking-popup-inputs">
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
        </div>
        <h3>Booking Slots</h3>
        <div className='booking-popup-slots-container-days'>
          {bookingSlots.length && bookingSlots.map((item,index)=>(
            <div key={index} onClick={()=>setSlotIndex(index)} className={`booking-popup-slots-dates ${slotIndex===index?"active":""}`}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='booking-popup-slots-container'>
          {bookingSlots.length && bookingSlots[slotIndex].map((item,index)=>(
            <p key={index} onClick={()=>setSlotTime(index)} className={`booking-popup-slots-times ${slotTime===index?"active":""}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>{bookingSlots.length > 0 && (
          <>
            <input type="hidden" name="selectedDay" value={formatDate(bookingSlots[slotIndex][0].datetime)} />
            <input type="hidden" name="selectedTime" value={bookingSlots[slotIndex][slotTime].time} />
          </>
        )}
        <button type='submit'>Book Appointment</button>
      </form>


    </div>
  )
}

export default BookingPopup

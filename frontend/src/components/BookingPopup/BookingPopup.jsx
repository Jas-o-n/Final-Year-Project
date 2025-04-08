import './BookingPopup.css'
import { CircleX } from 'lucide-react'
import { getUserID } from '../../utils/authUtils';
import { StoreContext } from '../../context/StoreContext';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import useClickOutside from '../../hooks/useClickOutside'

function useBookingSlots() {
  const [bookingSlots,setBookingSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState(0)

  const getAvailableSlots = async () => {
    if (bookingSlots.length > 0) return;
    let today = new Date()
    let slots = []

    for(let i=0 ; i<7 ; i++) {
      // set current date
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
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
      // set end time
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)
      
      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      slots.push(timeSlots)
    }

    // Find first day with available slots
    const firstAvailableDay = slots.findIndex(daySlots => daySlots.length > 0)
    if (firstAvailableDay !== -1) {
      setSlotIndex(firstAvailableDay)
    }
    
    setBookingSlots(slots)
  }

  useEffect(()=>{
    getAvailableSlots()
  },[])
  
  return {bookingSlots,slotIndex,setSlotIndex,slotTime,setSlotTime}
}

const BookingPopup = ({setShowBooking}) => {

  const daysOfWeek = ["SUN","MON","TUE","WED","THU","FRI","SAT"]
  const {url} = useContext(StoreContext)

  const token = localStorage.getItem("token");

  const {bookingSlots,slotIndex,slotTime,setSlotIndex,setSlotTime} = useBookingSlots()

  const popupRef = useClickOutside(() => {
    setShowBooking(false)
  })

  const onBooking = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const selectedDate = new Date(formData.get('selectedDate'));
    const selectedTime = formData.get('selectedTime');
    const userID = formData.get('userID');

    const data = {
        userID: userID,
        date: selectedDate.toISOString(),
        time: selectedTime
    };

    try{
      const response = await axios.post(`${url}/api/booking/add`, data);
      if (response.data.success) {
        toast.success(response.data.message);
        setShowBooking(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
        toast.error("Failed to submit booking request");
    }
    
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className='booking-popup'>  
    {!token
    ?<div className="booking-popup-container">
      <div className="booking-popup-title">
            <h2>Please log in to book an appointment!</h2>
            <span onClick={()=>setShowBooking(false)} className='booking-popup-title-icon'>
              <CircleX color='red' size={24} />
            </span>
        </div>
    </div>  
      :<form onSubmit={onBooking} className="booking-popup-container" ref={popupRef}>
        <div className="booking-popup-title">
            <h2>Book an Appointment</h2>
            <span onClick={()=>setShowBooking(false)} className='booking-popup-title-icon'>
              <CircleX color='red' size={24} />
            </span>
        </div>
        
        <div className='booking-popup-slots-container-days'>
          {bookingSlots.length && bookingSlots.map((item,index)=>(
            <div key={index} onClick={()=>{setSlotIndex(index);setSlotTime(0)}} className={`booking-popup-slots-dates ${slotIndex===index?"active":""}`}>
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
        </div>{bookingSlots.length > 0 && bookingSlots[slotIndex] && bookingSlots[slotIndex][0] && (
          <>
            <input type="hidden" name="selectedDate" value={formatDate(bookingSlots[slotIndex][0].datetime)} />
            <input type="hidden" name="selectedTime" value={bookingSlots[slotIndex][slotTime].time} />
            <input type="hidden" name="userID" value={getUserID()} />
          </>
        )}
        <button type='submit'>Book Appointment</button>
      </form>}
    </div>
  )
}

export default BookingPopup

import React, { useEffect, useState } from 'react'
import './ListBookings.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { CalendarSync } from 'lucide-react';

function useBookings(url) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/booking/list`);
      if (response.data.success) {
        const bookings = response.data.data;
        const userIDs = [...new Set(bookings.map(booking => booking.userID))];
        const usersResponse = await axios.post(`${url}/api/user/getUsersByIDs`, { userIDs });
        if (usersResponse.data.success) {
          const users = usersResponse.data.data;
          const bookingsWithUserEmails = bookings.map(booking => ({
            ...booking,
            userEmail: users.find(user => user._id === booking.userID).email,
            formattedDate: new Date(booking.date).toLocaleDateString()
          }));
          setList(bookingsWithUserEmails);
        } else {
          toast.error("Error fetching users");
        }
      } else {
        toast.error("Error fetching bookings");
      }
    } catch (error) {
      toast.error("An error occurred while fetching data");
    }
  };

  const removeInvalidBookings = async () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const invalidBookings = list.filter(booking => new Date(booking.date) < currentDate);
    
    for (const booking of invalidBookings) {
      const success = await deleteBooking(booking._id);
      if (success) {
        setList(prevList => prevList.filter(item => item._id !== booking._id));
      }
    }
  };

  const deleteBooking = async (bookingID) => {
    const response = await axios.post(`${url}/api/booking/remove`, { id: bookingID });
    if (response.data.success) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    removeInvalidBookings();
  }, [list]);

  return { list, fetchList };
}

const ListBookings = ({ url }) => {
  const { list, fetchList } = useBookings(url);

  const handleStatusUpdate = async (bookingID, status) => {
    const response = await axios.post(`${url}/api/booking/updateStatus`, { 
      id: bookingID,
      status: status 
    });
    if (response.data.success) {
      toast.success(response.data.message);
      fetchList();
    } else {
      toast.error("Error updating status");
    }
  };

  const handleRemoveBooking = async (bookingID) => {
    const response = await axios.post(`${url}/api/booking/remove`, { id: bookingID });
  if (response.data.success) {
    toast.success(response.data.message);
    fetchList();
    return true;
  } else {
    toast.error("Error");
    return false;
  }
  };

  return (
    <div className='list add flex-col'>
      <div className='list-title'>
        <p>All Bookings</p>
        <div className='list-title-right' onClick={fetchList}>
          <p>Refresh</p>
          <CalendarSync />
        </div>
      </div>
      <div className="list-table">
        <div className="list-bookings-table-format title">
          <b>User Email</b>
          <b>Date</b>
          <b>Time</b>
          <b>Status</b>
          <b>Actions</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-bookings-table-format'>
              <p>{item.userEmail}</p>
              <p>{item.formattedDate}</p>
              <p>{item.time}</p>
              <p>{item.status}</p>
              <div className="booking-actions">
                <p onClick={() => handleStatusUpdate(item._id, 'approved')} className='cursor approve'>↑</p>
                <p onClick={() => handleStatusUpdate(item._id, 'denied')} className='cursor deny'>↓</p>
                <p onClick={() => handleRemoveBooking(item._id)} className='cursor remove'>X</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListBookings;

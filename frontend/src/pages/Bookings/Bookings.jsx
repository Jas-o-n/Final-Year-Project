import React, { useState, useEffect, useContext } from 'react';
import './Bookings.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getUserID } from '../../utils/authUtils';
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const { url } = useContext(StoreContext)

  const token = localStorage.getItem('token');

  const fetchBookings = async () => {
    try {
      const userID = getUserID();
      const response = await axios.get(`${url}/api/booking/${userID}`);
      if (response.data.success) {
        const formattedBookings = response.data.data.map(booking => ({
          ...booking,
          formattedDate: new Date(booking.date).toLocaleDateString()
        }));
        setBookings(formattedBookings);
      } else {
        toast.error("Error fetching bookings");
      }
    } catch (error) {
      toast.error("An error occurred while fetching bookings");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchBookings();
  }, [navigate]);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'denied': return 'status-denied';
      default: return 'status-pending';
    }
  };

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h2>My Bookings</h2>
        <button onClick={fetchBookings} className="refresh-button">
          Refresh
        </button>
      </div>
      <div className="table-container">
        {bookings.length > 0 ? (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.formattedDate}</td>
                  <td>{booking.time}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-bookings">
            <p>No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;

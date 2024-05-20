'use client'

import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import axios from 'axios';
import { type } from 'os';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('Pending');
  const {touristid, setTouristId} = useContext(UserContext);

    // Fetch bookings data from API
    const fetchBookings = async () => {
      try {
          const response = await axios.get(`http://localhost:3019/api/bookings/${touristid}/tourist`);
          console.log("reviews:" + response.data)
          setBookings(response.data);
      } catch (error) {
          console.error('Error fetching bookings:', error);
      }
      };

  useEffect(() => {
    // Dummy data for bookings (replace with actual API data)
    const dummyBookings = [
      { id: 1, type: 'event', name: 'Event 1', date: '2024-05-20', location: 'Location 1', status: 'pending' },
      { id: 2, type: 'tour', name: 'Tour 1', date: '2024-05-22', location: 'Location 2', status: 'completed' },
      { id: 3, type: 'guide', name: 'Guide 1', date: '2024-05-25', location: 'Location 3', status: 'rejected' },
      // Add more booking objects as needed
    ];
    fetchBookings();
    // setBookings(dummyBookings);
  }, []);


  const filterBookingsByStatus = (status) => {
    return bookings.filter(booking => booking.booking.status === status);
  };

  return (
    <>
      <div className="booking-page">
        <h2 className="booking-heading">My Bookings</h2>
        <div className="tabs">
          <button className={activeTab === 'Pending' ? 'active' : ''} onClick={() => setActiveTab('Pending')}>Pending</button>
          <button className={activeTab === 'Completed' ? 'active' : ''} onClick={() => setActiveTab('Completed')}>Completed</button>
          <button className={activeTab === 'Rejected' ? 'active' : ''} onClick={() => setActiveTab('Rejected')}>Rejected</button>
        </div>
        <div className="booking-table">
          <table>
            <thead>
              <tr>
                <th>Booking Type</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filterBookingsByStatus(activeTab).map(booking => (
                <tr key={booking.booking._id}>
                  <td>{booking.booking.type}</td>
                  <td>{booking.booking.type === 'event' ?(
                    <>
                      {booking.activityData?.eventName}, {new Date(booking.activityData?.date).toLocaleDateString('en-US')}
                    </>
                    ):(
                      <>
                    {booking.activityData.tourName}, {new Date(booking.activityData?.startDate).toLocaleDateString('en-US')}
                    </>
                  )}
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingPage;

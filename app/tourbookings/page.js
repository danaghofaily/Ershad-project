'use client'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
//import '../styles/TourBookings.css'; // Import CSS file for styling



const BookingScreen = ({ guideId }) => {
  const [bookings, setBookings] = useState([]);
  const {touristGuideId, setTouristGuideId} = useContext(UserContext);

  useEffect(() => {
    fetchBookingsForGuide(touristGuideId);
  }, [guideId]); // Fetch bookings whenever guideId changes

  const fetchBookingsForGuide = async (touristGuideId) => {
    try {
      const response = await axios.get(`http://localhost:3019/api/booking/${touristGuideId}/guide`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
  <>
      <div className="booking-screen">
        <h1>Bookings</h1>
        {bookings.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Tour Name</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking?.activityData?.tourName}</td>
                  <td>{booking?.activityData?.destinations}</td>
                  <td>{new Date(booking?.activityData?.startDate).toLocaleDateString('en-US')}</td>
                  <td>{new Date(booking?.activityData?.endDate).toLocaleDateString('en-US')}</td>
                  <td>{booking?.activityData?.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-bookings">
            <p>No bookings yet</p>
          </div>
        )}
      </div>
      </>
  );
};

export default BookingScreen;

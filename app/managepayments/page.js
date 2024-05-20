'use client'
import React, { useState, useEffect } from 'react';
//import Layout from '../misc/Layout';
//import '../styles/ManagePayments.css';
import axios from 'axios';

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState({});
  const [activeTab, setActiveTab] = useState('tour');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const paymentResponse = await axios.get('http://localhost:3019/api/payment');
        setPayments(paymentResponse.data);
        
        // Fetch booking details for each payment
        const bookingPromises = paymentResponse.data.map(payment =>
          axios.get(`http://localhost:3019/api/booking/${payment.booking_id._id}`)
        );
        const bookingResponses = await Promise.all(bookingPromises);
        
        // Create a bookings object keyed by booking ID for easy access
        const bookingsData = bookingResponses.reduce((acc, response) => {
          acc[response.data.booking._id] = response.data;
          return acc;
        }, {});
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching payments and bookings:', error);
      }
      setIsLoading(false);
    };

    fetchPayments();
  }, []);

  const handlePaymentCompleted = async (paymentId) => {
    try {
      await axios.patch(`http://localhost:3019/api/payment/${paymentId}/approve`);
      setPayments(payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: 'Completed' } : payment
      ));
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const filteredPayments = payments.filter(payment => {
    const booking = bookings[payment.booking_id._id];

    return booking ? booking.booking?.type === activeTab : false;
  });

  return (
    <>
      <div className="manage-payments-page">
        <h2>Manage Payments</h2>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'tour' ? 'active' : ''}`}
            onClick={() => setActiveTab('tour')}
          >
            Tours
          </button>
          <button
            className={`tab-button ${activeTab === 'event' ? 'active' : ''}`}
            onClick={() => setActiveTab('event')}
          >
            Events
          </button>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Commission</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => {
                const booking = bookings[payment.booking_id._id];
                return booking ? (
                  <tr key={payment.id}>
                    <td>{booking.activityData.tourName}</td>
                    <td>SAR{booking.activityData.price}</td>
                    <td>SAR{payment.commission}</td>
                    <td>{payment.paymentStatus == true ? 'Payment Completed' : 'Pending'}</td>
                    <td>
                      {payment.paymentStatus != true && (
                        <button
                          className="action-btn complete-btn"
                          onClick={() => handlePaymentCompleted(payment._id)}
                        >
                          Payment Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        )}
      </div>
      </>
  );
};

export default ManagePayments;

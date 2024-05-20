'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3019/api/booking');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleAction = async (bookingId, action) => {
    try {
      await axios.patch(`http://localhost:3019/api/booking/${bookingId}/${action}/status`);
      const updatedBookings = bookings.map(booking =>
        booking.booking._id === bookingId ? { ...booking, booking: { ...booking.booking, status: action } } : booking
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error(`Error ${action} booking:`, error);
    }
  };

  return (
    <div style={styles.manageBookingPage}>
      <h2 style={styles.heading}>Manage Bookings</h2>
      <table style={styles.bookingTable}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Booking ID</th>
            <th style={styles.tableHeader}>Customer Name</th>
            <th style={styles.tableHeader}>Tour/Event Name</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Status</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.booking._id} style={styles.tableRow}>
              <td style={styles.tableCell}>{booking.booking._id}</td>
              <td style={styles.tableCell}>{booking.touristData?.touristName}</td>
              <td style={styles.tableCell}>
                {booking.booking.type === 'event' ? booking.activityData?.eventName : booking.activityData?.tourName}
              </td>
              <td style={styles.tableCell}>{booking.activityData.date}</td>
              <td style={styles.tableCell}>{booking.booking.status}</td>
              <td style={styles.tableCell}>
                {booking.booking.status === 'Pending' && (
                  <>
                    <button
                      style={{ ...styles.actionButton, ...styles.rejectButton }}
                      onClick={() => handleAction(booking.booking._id, 'Rejected')}
                    >
                      Reject
                    </button>
                    <button
                      style={{ ...styles.actionButton, ...styles.completeButton }}
                      onClick={() => handleAction(booking.booking._id, 'Completed')}
                    >
                      Complete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  manageBookingPage: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
  },
  bookingTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '10px',
  },
  tableRow: {
    backgroundColor: '#fff',
    '&:nth-child(even)': {
      backgroundColor: '#f2f2f2',
    },
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
  },
  actionButton: {
    padding: '8px 12px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
  },
  completeButton: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
};

export default ManageBookingPage;

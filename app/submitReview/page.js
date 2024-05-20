'use client'
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';

const SubmitReviews = () => {  
  const [bookings, setBookings] = useState([]);
  const [reviewDataList, setReviewDataList] = useState([]);
  const { touristid } = useContext(UserContext);

  useEffect(() => {
    // Fetch bookings from the API
    
    fetch(`http://localhost:3019/api/bookings/${touristid}/tourist`)
      .then(response => response.json())
      .then(data => {
        // Initialize isOpen property for each booking
        const bookingsWithOpen = data.map(booking => ({ ...booking, isOpen: false }));
        setBookings(bookingsWithOpen);
        // Initialize reviewDataList with default values for each booking
        const defaultReviewDataList = data.map(booking => ({
          review: '',
          rating: 3 // Default rating
        }));
        setReviewDataList(defaultReviewDataList);
      })
      .catch(error => console.error('Error fetching bookings:', error));
  }, [touristid]);

  const togglePanel = (index) => {
    setBookings(bookings.map((booking, i) => 
      i === index ? { ...booking, isOpen: !booking.isOpen } : booking
    ));
  };

  const handleSubmitReview = (bookingId, activityId, index) => {
    // Get the review data for the current booking
    const reviewData = reviewDataList[index];
    
    // Remove the booking from the list upon successful submission
    setBookings(bookings.filter((booking, i) => i !== index));

    // Simulate API call to submit review data
    const payload = {
      booking_id: bookingId,
      activity_id: activityId,
      rating: reviewData.rating,
      reviewDescription: reviewData.review,
      reviewer_id: touristid
    };

    fetch('http://localhost:3019/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Review submitted successfully');
      })
      .catch(error => {
        console.error('Error submitting review:', error);
      });
  };

  const handleReviewChange = (e, index) => {
    // Update the review data for the current booking
    const updatedReviewDataList = [...reviewDataList];
    updatedReviewDataList[index] = { ...updatedReviewDataList[index], review: e.target.value };
    setReviewDataList(updatedReviewDataList);
  };

  const handleRatingChange = (e, index) => {
    // Update the review data for the current booking
    const updatedReviewDataList = [...reviewDataList];
    updatedReviewDataList[index] = { ...updatedReviewDataList[index], rating: parseInt(e.target.value) };
    setReviewDataList(updatedReviewDataList);
  };

  return (
    <div className="submit-reviews-container">
      <h1 className="title">Submit Reviews</h1>
      {bookings.length === 0 ? (
        <p>No bookings available for review.</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={booking.id} className={`booking-panel ${booking.isOpen ? 'open' : ''}`}>
            <div className="panel-header" onClick={() => togglePanel(index)}>
              {booking.booking.type === "tour" ? (
                <>
                  <h4 className="booking-name">{booking.activityData.tourName}</h4>
                </>
              ) : (
                <>
                  <h4 className="booking-name">{booking.activityData.eventName}</h4>
                </>
              )}
              <span className="arrow">{booking.isOpen ? '▼' : '▶'}</span>
            </div>
            <div className="panel-content">
              {booking.booking.type === "tour" ? (
                <>
                  <p className="info"><strong>Date:</strong> {booking.activityData.startDate}</p>
                </>
              ) : (
                <>
                  <p className="info"><strong>Date:</strong> {booking.activityData.date}</p>
                </>
              )}
              <p className="info"><strong>Location:</strong> {booking.activityData.destinations}</p>
              <p className="info"><strong>Type:</strong> {booking.booking.type}</p>
              <textarea
                className="review-description"
                placeholder="Enter your review here..."
                value={reviewDataList[index].review}
                onChange={(e) => handleReviewChange(e, index)}
              ></textarea>
              <div className="rating">
                <label htmlFor="rating">Rating:</label>
                <input
                  type="range"
                  id="rating"
                  min="1"
                  max="5"
                  value={reviewDataList[index].rating}
                  onChange={(e) => handleRatingChange(e, index)}
                />
                <span>{reviewDataList[index].rating}/5</span>
              </div>
              <button
                className="submit-button"
                onClick={() => handleSubmitReview(booking.booking._id, booking.booking.activity_id, index)}
              >
                Submit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SubmitReviews;

'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './ManageReviews.css'; // Import CSS file

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3019/api/reviews?status=pending');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
      setIsLoading(false);
    };

    fetchReviews();
  }, []);

  const handleApproval = async (reviewId) => {
    try {
      const response = await axios.patch(`http://localhost:3019/api/reviews/${reviewId}/approve`);
      console.log('Review Approved:', response.data);
      // Update the status of the approved review in the state
      setReviews(reviews.map(review =>
        review._id === reviewId ? { ...review, approve: true } : review
      ));
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  return (
    <div className="manage-reviews-page">
      <h1>Manage Reviews</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="reviews-table">
          <thead>
            <tr>
            
              <th>Review Description</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review._id}>
            
                <td>{review.reviewDescription}</td>
                <td>{review.rating}</td>
                <td>{review.approve ? 'Approved' : 'Pending'}</td>
                <td>
                  {!review.approve && (
                    <button
                      className="approve-btn"
                      onClick={() => handleApproval(review._id)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageReviews;

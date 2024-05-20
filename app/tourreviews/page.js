'use client'
import React, { useState, useEffect } from 'react';
//import Layout from '../misc/Layout';
import axios from 'axios';
//import '../styles/TourReviews.css'; // Import CSS file for styling

const ReviewsScreen = ({ guideId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviewsForGuide(guideId);
  }, [guideId]); // Fetch reviews whenever guideId changes

  const fetchReviewsForGuide = async (guideId) => {
    try {
      const response = await axios.get(`http://localhost:3019/api/reviews?guideId=${guideId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  return (

      <div className="reviews-screen">
        <h1>Reviews</h1>
        {reviews.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={index}>
                  <td>{review.rating}</td>
                  <td>{review.reviewDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-reviews">
            <p>No reviews yet</p>
          </div>
        )}
      </div>

  );
};

export default ReviewsScreen;

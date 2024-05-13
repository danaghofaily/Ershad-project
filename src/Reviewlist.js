import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the backend when the component mounts
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3019/tour-guide/reviews');
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="container mt-4" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <h2 className="text-center mb-4" style={{color:'white'}}>Tour Guide Reviews</h2>
      <div className="row">
        {reviews.map((review, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <div className="card-body">
                <h5 className="card-title">Name: {review.tourGuideName}</h5>
                <p className="card-text">Comment: {review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;

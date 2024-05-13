import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewList2 = () => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3019/tour-guide/review/${id}`);
      // After successful deletion, remove the deleted review from the state
      setReviews(reviews.filter(review => review._id !== id));
      alert('Review deleted successfully!');
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review. Please try again later.');
    }
  };

  return (
    <div className="container mt-4" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <h2 className="text-center mb-4" style={{ color: 'white' }}>Tour Guide Reviews</h2>
      <table className="table table-striped" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Comment</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{review.tourGuideName}</td>
              <td>{review.comment}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(review._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewList2;

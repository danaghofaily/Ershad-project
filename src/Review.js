import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = () => {
  const [tourGuideName, setTourGuideName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3019/tour-guide/review', { tourGuideName, comment });
      alert('Review submitted successfully!');
      setTourGuideName('');
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again later.');
    }
  };

  return (
    <div className="container mt-4" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517284541949-057f9c145c26?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, backgroundSize: 'cover', minHeight: '100vh', padding: '20px' }}>
      <h2 className="text-center mb-4" style={{color:'white'}}>Tour Guide Review Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tourGuideName" style={{color:'white'}}>Tour Guide Name:</label>
          <input 
            type="text" 
            id="tourGuideName" 
            className="form-control" 
            value={tourGuideName} 
            onChange={(e) => setTourGuideName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment" style={{color:'white'}}>Comment:</label>
          <textarea 
            id="comment" 
            className="form-control" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;

'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import axios from 'axios';

const TourDetails = () => {

  const pathname = usePathname(); // Access the pathname

  const router = useRouter();
  const pathSegments = pathname.split('/'); // Split pathname to get segments
  const id = pathSegments[2]; // Access the `id` parameter
  const type = pathSegments[3];
  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState([]);

  const getTourData = async() =>{
    try {
      const response = await axios.get(`http://localhost:3019/api/tours/${id}`);
      if (response.status === 200) {
        setData(response.data);
        return response.data; // Assuming the response contains event details in JSON format
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      // Handle error
    }
  };


  const getEventData = async() =>{
    try {
      const response = await axios.get(`http://localhost:3019/api/events/${id}`);
      if (response.status === 200) {
        setData(response.data);
        return response.data; // Assuming the response contains event details in JSON format
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      // Handle error
    }
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3019/api/reviews/${id}`);
      if (response.status === 200) {
        setReviews(response.data);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Handle error
    }
  };



  useEffect(() => {
    if (type === 'event') {
      getEventData();
    } else if (type === 'tour') {
      getTourData();
    }
  }, [type, id]);

  useEffect(() => {
    getReviews();
  }, [id]);

  const handleCheckout = () => {
    router.push(`/checkout/${id}/${type}`);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="tour-details">
      {type === 'event' ? (
            <>
              <h1>{data.eventName}</h1>
            </>
          ) : (
            <>
              <h1>{data.tourName}</h1>
            </>
          )}
          
        <img src={data.image} alt={data.name} />
        <div className="details">
          {type === 'event' ? (
            <>
              <p><strong>Location:</strong> {data.location}</p>
              <p><strong>Date:</strong> {new Date(data.date).toLocaleDateString('en-US')}</p>
            </>
          ) : (
            <>
              <p><strong>Destinations:</strong> {data.destinations.join(', ')}</p>
              <p><strong>Start Date:</strong>{new Date(data.startDate).toLocaleDateString('en-US')}</p>
              <p><strong>End Date:</strong> {new Date(data.endDate).toLocaleDateString('en-US')}</p>
              
            </>
          )}
          <p><strong>Price:</strong> SAR {data.price}</p>
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        </div>

        <div className="guide">
        {type === 'tour' ? (<>
          <div className="guide-info">
            <h3>Tour Guide</h3>
            <h3><strong>Name:</strong> {data.guide_id?.tourGuideName}</h3>
            <h3><strong>Experience:</strong> {data.guide_id?.description}</h3>
          </div>
          
          

<div className="guide-image" style={{ width: '150px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
  <img src={data.guide_id?.image} alt="Tour Guide" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
</div>


        </>):
          <></>}

        </div>
        <div className="reviews">
          <h3>Reviews</h3>
          {data.reviews.length === 0 ? (
            <p>No reviews up till now</p>
          ) : (
            data.reviews.map(review => (
              <div key={review._id} className="review">
                <div className="review-header">
                  <span className="rating"><strong>Rating:</strong>{review.rating} / 5</span>
                </div>
                <p><strong>Review Description:</strong> {review.reviewDescription}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TourDetails;

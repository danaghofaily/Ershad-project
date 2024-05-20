'use client'
import React, { useEffect, useState, useContext } from 'react';
//import Layout from '../misc/Layout';
//import '../styles/GuideProfile.css';
import axios from 'axios';
import UserContext from '../UserContext';

const TourGuideProfile = () => {
  
  const {touristGuideId, setTouristGuideId} = useContext(UserContext);

  const [guideDetails, setGuideDetails] = useState(null);
  const [tourCount, setTourCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuideDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3019/api/tourguides/${touristGuideId}`);
        setGuideDetails(response.data);
      } catch (error) {
        console.error('Error fetching guide details:', error);
      }
    };

    const fetchTourCount = async () => {
      try {
        const response = await axios.get(`http://localhost:3019/api/guides/${touristGuideId}/tourcount`);
        setTourCount(response.data.tourCount);
      } catch (error) {
        console.error('Error fetching tour count:', error);
      }
    };

    fetchGuideDetails();
    fetchTourCount();
    setIsLoading(false);
  }, [touristGuideId]);

  return (
    <>
    <div className="tour-guide-profile">
      {isLoading ? (
        <div>Loading...</div>
      ) : guideDetails ? (
        <>
          <div className="profile-header">
            <img src={guideDetails?.image} alt={guideDetails.tourGuideName} />
            <div className="header-details">
              <h1>{guideDetails.tourGuideName}</h1>
              <p>{guideDetails.location}</p>
              <p className={`verification-status ${guideDetails.approved ? 'verified' : ''}`}>
                <span className="icon">✔️</span>
                {guideDetails.approved ? 'Verified' : 'Not Verified'}
              </p>
            </div>
          </div>
          <div className="profile-details">
            <h2>About Me</h2>
            <p>{guideDetails.desc}</p>
            <h2>Contact Information</h2>
            <p>Phone: {guideDetails.phoneNo}</p>
            <p>Date of Birth: {new Date(guideDetails.dob).toLocaleDateString('en-US')}</p>
            <p>Gender: {guideDetails.gender}</p>
          </div>
        </>
      ) : (
        <div>No data available for this guide.</div>
      )}
    </div>
    </>
  );
};

export default TourGuideProfile;

'use client'
import React, { useState, useEffect } from 'react';
//import Layout from '../misc/Layout';
//import '../styles/VerifyTourGuides.css';
import axios from 'axios';

const VerifyTourGuides = () => {
  const [tourGuides, setTourGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTourGuides = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3019/api/tourguides/unapproved');
        setTourGuides(response.data);
      } catch (error) {
        console.error('Error fetching tour guides:', error);
      }
      setIsLoading(false);
    };

    fetchTourGuides();
  }, []);

  const handleVerification = async (tourGuideId) => {
    try {
      const response = await axios.patch(`http://localhost:3019/api/tourguides/${tourGuideId}/approve`);
      console.log('Tour Guide Verified:', response.data);
      
      // Update the tour guide status in the state immediately
      setTourGuides(tourGuides.map((guide) =>
        guide.id === tourGuideId ? { ...guide, status: 'Verified' } : guide
      ));
    } catch (error) {
      console.error('Error verifying tour guide:', error);
    }
  };
  
  return (
    <>
      <div className="verify-tour-guides-page">
        <h2>Verify Tour Guides</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="tour-guides-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Tour Guide Name</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tourGuides.map((guide) => (
                <tr key={guide.id}>
                  <td><img src={guide.image} alt={guide.name} className="guide-image" /></td>
                  <td>{guide.tourGuideName}</td>
                  <td>{guide.gender}</td>
                  <td>{guide.phoneNo}</td>
                  <td>{guide.location}</td>
                  <td>{guide.approved ? 'Approved' : 'UnApproved'}</td>
                  <td>
                    {guide.approved != true && (
                      <button
                        className="action-btn verify-btn"
                        onClick={() => handleVerification(guide._id)}
                      >
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      </>
  );
};

export default VerifyTourGuides;

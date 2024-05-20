'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useContext } from 'react';
import UserContext from '../UserContext';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const { username } = useContext(UserContext);

    console.log(username);

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const apiUrl = `http://localhost:3019/api/tourists/user/${username}`;
        const response = await axios.get(apiUrl); // Replace with actual API endpoint
        setUserData(response.data); // Assuming the API returns user data in JSON format
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };


    fetchUserData();
  }, []); 
  
    // Dummy user data
    

  return (
    <>
      <div className="profile-page">
        <h1>Profile</h1>
        {userData && (
          <div className="profile-details">
            <div>
              <strong>Username:</strong> {userData.touristName}
            </div>
            <div>
              <strong>Date of Birth:</strong> {new Date(userData.dob).toLocaleDateString('en-US')}
            </div>
            <div>
              <strong>Phone Number:</strong> {userData.phoneNo}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;

'use client'

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../app/utils/auth'; // Custom function to set JWT token in local storage
import UserContext from './UserContext';
import { useRouter } from 'next/navigation';

// Define the Login component
export default function Login() {
    const router = useRouter();
    const { setUsername } = useContext(UserContext);
    const { setMenuItems } = useContext(UserContext);
    const { setUserType } = useContext(UserContext);
    const { setisLoggedIn } = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loginMessage, setLoginMessage] = useState('');
    const [error, setError] = useState('');

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGuest = () => {
        const userType = "guest";

        setUserType(userType)
        setMenuItems(['signupTourGuide', 'signupTourist']);
        router.push(`/home/${userType}`);
    }
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:3019/api/login', formData);
            setLoginMessage(response.data.message); // Set login success message
            setError(''); // Clear any previous error messages

            // Store the JWT token in local storage
            setAuthToken(response.data.token);
                        

            const userType = response.data.type;
            setisLoggedIn(true);
            
            if (userType === 'tourist') {
                setMenuItems(['bookings', 'touristProfile', 'submitReview', 'destination', 'contact' ]);
            } else if (userType === 'tourguide') {
                setMenuItems(['GuideProfile', 'tourbookings', 'tourreviews', 'managetours']);
            } else if (userType === 'admin') {
                setMenuItems(['verifytourguide', 'manageBooking', 'manageevents', 'managepayments','managereviews']);
            }
            else{
              setMenuItems(['signupTourGuide', 'signupTourist']);
            }
            setUserType(userType);

            setUsername(response.data.user_id);

            alert('Login successful!'); // Show alert or redirect to dashboard

            router.push(`/home/${userType}`);

        } catch (error) {
            setLoginMessage(''); // Clear login success message
            console.log(error.message);
            setError(error.response?.data?.message || 'An error occurred'); // Set error message
        }
    };

    // JSX for the Login component
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
            <div style={{ width: '400px', padding: '40px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '20px' }}>Login</h2>
                {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
                {loginMessage && <p style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>{loginMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '30px'}}>Login</button>
                    
                    <button onClick= {() => handleGuest()} type="" style={{ width: '100%', padding: '12px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase' }}>Visit as a Guest</button>
                    
                </form>
            </div>
        </div>
    );
}
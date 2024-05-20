'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Define the Signup component
export default function Signup() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        tourGuideName: '',
        tourGuidePhoneNo: '',
        tourGuideDOB: '',
        tourGuideGender: '',
        tourGuideImage: '',
        tourGuideApproved: false,
        tourGuideDesc: '',
        tourGuideLocation: '',
        tourGuidePricePerVisit: ''
    });
    const [signupMessage, setSignupMessage] = useState('');
    const [error, setError] = useState('');

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSignup = async (e) => {
        e.preventDefault();

        // Validate email ending with @gmail.com
        if (!formData.email.endsWith('@gmail.com')) {
            setError('Email must end with @gmail.com');
            return;
        }

        try {
            const userSignupResponse = await axios.post('http://localhost:3019/api/users', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: 'tourguide'
            });

            // Extract userId from the user signup response
            const userId = userSignupResponse.data.newUser._id;
            console.log(userSignupResponse.data.newUser._id);

            // Call the tour guide signup API with userId
            await axios.post('http://localhost:3019/api/tourguides', {
                user_id: userId, // Using the userId obtained from the user signup response
                tourGuideName: formData.tourGuideName,
                phoneNo: formData.tourGuidePhoneNo,
                dob: formData.tourGuideDOB,
                gender: formData.tourGuideGender,
                image: formData.tourGuideImage,
                approved: false,
                description: formData.tourGuideDesc,
                location: formData.tourGuideLocation,
                pricePerVisit: formData.tourGuidePricePerVisit
            });

            setSignupMessage('User and Tour Guide signups successful!');
            setError('');
            router.push('/');
        } catch (error) {
            setSignupMessage('');
            setError(error.response?.data?.message || error.message);
        }
    };

    // JSX for the Signup component
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f2f2f2' }}>
            <div style={{ width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Sign Up as Tour Guide</h2>
                {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
                {signupMessage && <p style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>{signupMessage}</p>}
                <form onSubmit={handleSignup}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Username:</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} required />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="tourGuideName" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Tour Guide Name:</label>
                        <input type="text" id="tourGuideName" name="tourGuideName" value={formData.tourGuideName} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="tourGuidePhoneNo" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Phone No.:</label>
                        <input type="text" id="tourGuidePhoneNo" name="tourGuidePhoneNo" value={formData.tourGuidePhoneNo} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="tourGuideDOB" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Date of Birth:</label>
                        <input type="date" id="tourGuideDOB" name="tourGuideDOB" value={formData.tourGuideDOB} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="tourGuideGender" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Gender:</label>
                        <select id="tourGuideGender" name="tourGuideGender" value={formData.tourGuideGender} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} required>
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="tourGuideImage" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Image URL:</label>
                        <input type="text" id="tourGuideImage" name="tourGuideImage" value={formData.tourGuideImage} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="tourGuideDesc" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Description:</label>
                        <textarea id="tourGuideDesc" name="tourGuideDesc" value={formData.tourGuideDesc} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="tourGuideLocation" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Location:</label>
                        <input type="text" id="tourGuideLocation" name="tourGuideLocation" value={formData.tourGuideLocation} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="tourGuidePricePerVisit" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Price Per Visit:</label>
                        <input type="number" id="tourGuidePricePerVisit" name="tourGuidePricePerVisit" value={formData.tourGuidePricePerVisit} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#444' }} required />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase' }}>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

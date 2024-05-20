'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        touristName: '',
        phoneNo: '',
        dob: ''
    });
    const [signupMessage, setSignupMessage] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Post data to the user table
            const userSignupResponse = await axios.post('http://localhost:3019/api/users', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: "tourist"
            });

            // Post data to the tourist table
            await axios.post('http://localhost:3019/api/tourists', {
                user_id: userSignupResponse.data.newUser._id,
                touristName: formData.touristName,
                phoneNo: formData.phoneNo,
                dob: formData.dob
            });

            setSignupMessage('Signup successful!');
            setError('');
            router.push('/')

        } catch (error) {
            setSignupMessage('');
            setError(error.response.data.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
            <div style={{ width: '400px', padding: '40px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Sign Up</h2>
                {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
                {signupMessage && <p style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>{signupMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Username:</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="touristName" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Tourist Name:</label>
                        <input type="text" id="touristName" name="touristName" value={formData.touristName} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="phoneNo" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Phone No.:</label>
                        <input type="text" id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="dob" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Date of Birth:</label>
                        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} style={inputStyle} />
                    </div>
                    <button type="submit" style={buttonStyle}>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#444',
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#444',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transition: 'background-color 0.3s',
};
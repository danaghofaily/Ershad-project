// Import necessary libraries
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'
import { setAuthToken } from '../src/utlis/Auth'; // Custom function to set JWT token in local storage

// Define the Login component
function Login() {
    const navigate = useNavigate(); // Use useNavigate hook for navigation
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3019/api/login', formData);
            setLoginMessage(response.data.message); // Set login success message
            setError(''); // Clear any previous error messages

            // Store the JWT token in local storage
            setAuthToken(response.data.token);

            alert('Login successful!'); // Show alert or redirect to dashboard
            navigate('/home'); // Navigate to the home page after successful login
        } catch (error) {
            setLoginMessage(''); // Clear login success message
            setError(error.response.data.message); // Set error message
        }
    };

    // JSX for the Login component
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#b38f51', color: '#444' }}>
            <div style={{ width: '300px', padding: '40px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'rgba(222,201,166)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {loginMessage && <p style={{ color: 'green', textAlign: 'center' }}>{loginMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white', color: '#444' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white', color: '#444' }} />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '10px' }}>Don't have an account? <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Sign Up</Link></p>
            </div>
        </div>
    );
}

export default Login; // Export the Login component

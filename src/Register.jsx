import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../src/styles/register.css';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'tourist' // Default role
    });
    const [registrationMessage, setRegistrationMessage] = useState('');
    const [error, setError] = useState('');

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3019/api/users', formData);
            setRegistrationMessage(response.data.message); // Set registration success message
            setError(''); // Clear any previous error messages
            alert('Registration successful!'); // Show alert
            navigate('/');
        
        } catch (error) {
            setRegistrationMessage(''); // Clear registration success message
            setError(error.response.data.message); // Set error message
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
            <img src="iLogo.png" class="iLogo" style={{width:'100px',justifyContent: 'center', alignItems: 'center', paddingLeft:'10px',display:'grid',margin:'0 auto'}}/>
                <h2>Sign Up</h2>
                {error && <p className="error">{error}</p>}
                {registrationMessage && <p className="success">{registrationMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
                            <option value="tourist">Tourist</option>
                            <option value="tourguide">Tour Guide</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit">Sign Up</button>
                    <p style={{ textAlign: 'center', marginTop: '10px' }}>Already Registered? <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>click to Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

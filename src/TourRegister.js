import React, { useState } from 'react';
import axios from 'axios';

function TourGuideForm() {
  const [formData, setFormData] = useState({
    tourGuideId: '',
    name: '',
    gender: '',
    image_url: '',
    destinations: '',
    charges_per_day: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Debugging: Log form data
    try {
      const response = await axios.post('http://localhost:3019/api/tour-guides', formData);
      console.log('Tour guide created:', response.data);
      alert('Guide Registered Successfully!');
      setFormData({  // Reset form data
        tourGuideId: '',
        name: '',
        gender: '',
        image_url: '',
        destinations: '',
        charges_per_day: ''
      });
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error('Error creating tour guide:', error);
      // Optionally, you can display an error message here
    }
  };

  return (
    <div style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661962542692-4fe7a4ad6b54?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#dec9a6', padding: '20px', borderRadius: '10px', maxWidth: '600px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Create Tour Guide</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#fff' }}>Tour Guide ID:</label>
            <input type="text" name="tourGuideId" value={formData.tourGuideId} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#fff' }}>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#fff' }}>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#fff' }}>Image URL:</label>
            <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#fff' }}>Destinations:</label>
            <input type="text" name="destinations" value={formData.destinations} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#fff' }}>Charges Per Day:</label>
            <input type="number" name="charges_per_day" value={formData.charges_per_day} onChange={handleChange} required />
          </div>
          <button type="submit" style={{ background: '#fff', color: '#b38f51', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>Create Tour Guide</button>
        </form>
      </div>
    </div>
  );
}

export default TourGuideForm;

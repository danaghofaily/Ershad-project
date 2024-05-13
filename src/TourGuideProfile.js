import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// CSS styles for the component
const styles = {
  container: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: "url('https://images.unsplash.com/photo-1547234936-74a4b1ee7f42?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  tourGuideImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '5px',
    marginTop: '10px',
  },
};

function TourGuideInfo() {
  const [tourGuideId, setTourGuideId] = useState('');
  const [tourGuideInfo, setTourGuideInfo] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setTourGuideId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3019/api/tour-guides/${tourGuideId}`);
      setTourGuideInfo(response.data);
      setError('');
    } catch (error) {
      setTourGuideInfo(null);
      setError('Tour guide not found');
    }
  };

  return (
    <div style={styles.container}>
      <NavLink to='/chat'><button>Start chat</button></NavLink>
      <br/>
      <div className="card" style={styles.card}>
        <h2>Login to your account by entering the ID</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="tourGuideId">Tour Guide ID:</label>
          <input type="text" id="tourGuideId" value={tourGuideId} onChange={handleChange} style={styles.input} />
          <button type="submit" style={styles.button}>Get Info</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        {tourGuideInfo && (
          <div>
            <h3>Tour Guide Information</h3>
            <p>Tour Guide ID: {tourGuideInfo.tourGuideId}</p>
            <p>Name: {tourGuideInfo.name}</p>
            <p>Gender: {tourGuideInfo.gender}</p>
            {tourGuideInfo.image_url && (
              <img src={tourGuideInfo.image_url} alt="Tour Guide" style={styles.tourGuideImage} />
            )}
            <p>Destinations: {tourGuideInfo.destinations.join(', ')}</p>
            <p>Charges Per Day: {tourGuideInfo.charges_per_day}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TourGuideInfo;

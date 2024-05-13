import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllGuidesPage() {
  const [tourGuides, setTourGuides] = useState([]);

  useEffect(() => {
    fetchTourGuides();
  }, []);

  const fetchTourGuides = async () => {
    try {
      const response = await axios.get('http://localhost:3019/api/tour-guides');
      setTourGuides(response.data);
    } catch (error) {
      console.error('Error fetching tour guides:', error);
    }
  };

  const cardStyle = {
    maxWidth: '300px',
    margin: '0 auto',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    backgroundColor: '#fff'
  };

  const imageStyle = {
    width: '100%',
    borderRadius: '10px 10px 0 0'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold'
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Tour Guides</h2>
      <div className="row">
        {tourGuides.map(tourGuide => (
          <div className="col-md-4 mb-4" key={tourGuide._id}>
            <div className="card" style={cardStyle}>
              <img src={tourGuide.image_url} className="card-img-top" alt={tourGuide.name} style={imageStyle} />
              <div className="card-body">
                <h5 className="card-title" style={titleStyle}>{tourGuide.name}</h5>
                <p className="card-text">Gender: {tourGuide.gender}</p>
                <p className="card-text">Destinations: {tourGuide.destinations}</p>
                <p className="card-text">Charges per Day: {tourGuide.charges_per_day}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllGuidesPage;

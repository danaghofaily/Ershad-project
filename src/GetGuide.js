import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

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

  // Filter only the approved tour guides
  const approvedTourGuides = tourGuides.filter(tourGuide => tourGuide.approved);

  return (
    <div className="container mt-4" style={{ backgroundImage: "url('')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="content" style={{ width: '100%' }}>
        <h2 className="mb-4 text-center">Tour Guides</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {approvedTourGuides.map(tourGuide => (
            <div key={tourGuide._id} style={{ maxWidth: '300px', margin: '0 10px 20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '10px', backgroundColor: '#D2B48C', color: '#333' }}>
              <img
                src={tourGuide.image_url}
                alt={tourGuide.name}
                style={{ width: '100%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
              />
              <div style={{ padding: '15px' }}>
                <h5 style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0 5px' }}>{tourGuide.name}</h5>
                <p style={{ margin: '5px 0' }}>Gender: {tourGuide.gender}</p>
                <p style={{ margin: '5px 0' }}>Destinations: {tourGuide.destinations}</p>
                <p style={{ margin: '5px 0' }}>Charges per Day: {tourGuide.charges_per_day}</p>
                <NavLink to='/booking'> <button className="btn btn-primary">Book Tour Guide</button></NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllGuidesPage;

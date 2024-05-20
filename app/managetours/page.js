
'use client'
import React, { useState, useEffect, useContext } from 'react';
//import Layout from '../misc/Layout';
//import '../styles/ManageTours.css';
import axios from 'axios';
import UserContext from '../UserContext';

const ManageTours = () => {

  const {touristGuideId, setTouristGuideId} = useContext(UserContext);

  const [tours, setTours] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tourName: '',
    destinations: [],
    startDate: '',
    endDate: '',
    price: '',
    image: '',
    guide_id : touristGuideId
  });

  useEffect(() => {
    fetchAllTours(); // Fetch all tours when component mounts
  }, []);

  const fetchAllTours = async () => {
    try {
      const response = await axios.get(`http://localhost:3019/api/tours/${touristGuideId}/guide`);
      setTours(response.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  const handleDelete = async (index) => {
    const tourId = tours[index].id;
    try {
      await axios.delete(`http://localhost:3019/api/tours/${tourId}`);
      const updatedTours = [...tours];
      updatedTours.splice(index, 1); // Remove the deleted tour from the list
      setTours(updatedTours);
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  const handleEdit = (index) => {
    setShowForm(true);
    setFormData({ ...tours[index], index }); // Set the index of the tour being edited
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if formData has an index property (indicating an existing tour)
    if (formData.hasOwnProperty('index')) {
      // Update existing tour
      const tourId = tours[formData.index]._id;
      console.log(tourId);

      try {
        await axios.put(`http://localhost:3019/api/tours/${tourId}`, formData);
        const updatedTours = [...tours];
        updatedTours[formData.index] = formData;
        setTours(updatedTours);
      } catch (error) {
        console.error('Error updating tour:', error);
      }
    } else {
      // Add new tour
      try {
        const response = await axios.post('http://localhost:3019/api/tours', formData);
        setTours([...tours, response.data]);
      } catch (error) {
        console.error('Error adding tour:', error);
      }
    }
    // Reset form data
    setFormData({
      tourName: '',
      destinations: [],
      startDate: '',
      endDate: '',
      price: '',
      image: '',
      guide_id : touristGuideId
    });
    // Hide the form
    setShowForm(false);
  };

  return (

      <div className="manage-tours-page">
        <h2>Manage Tours</h2>
        <button className="add-tour-btn" onClick={() => setShowForm(true)}>
          Add Tour
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} className="tour-form">
            <input
              type="text"
              placeholder="Tour Name"
              value={formData.tourName}
              onChange={(e) => setFormData({ ...formData, tourName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Destinations"
              value={formData.destinations.join(', ')} // Join the array to display as comma-separated string
              onChange={(e) => {
                const destinationsArray = e.target.value.split(',').map(item => item.trim());
                setFormData({ ...formData, destinations: destinationsArray });
              }}
            />
            <input
              type="date"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <input
              type="date"
              placeholder="End Date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
            <input
              type="text"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <button type="submit">{formData.hasOwnProperty('index') ? 'Update' : 'Add'}</button>
          </form>
        )}
        <table className="tours-table">
          <thead>
            <tr>
              <th>Tour Name</th>
              <th>Destinations</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour._id}>
                <td>{tour.tourName}</td>
                <td>{tour.destinations}</td>
                <td>{tour.startDate}</td>
                <td>{tour.endDate}</td>
                <td>SAR{tour.price}</td>
                <td>
                  <img src={tour.image} alt={tour.tourName} className="tour-image" />
                </td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  );
};

export default ManageTours;

'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Layout from '../misc/Layout';
//import '../styles/ManageEvents.css';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    desc: '',
    location: '',
    date: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3019/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3019/api/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = (index) => {
    setShowForm(true);
    setFormData({ ...events[index], index }); // Set the index of the event being edited
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.hasOwnProperty('index')) {
        // Update existing event (Assuming an update API exists)
        const eventId = events[formData.index]._id;

        const response = await axios.put(`http://localhost:3019/api/events/${eventId}`, formData);
        const updatedEvents = [...events];
        updatedEvents[formData.index] = formData;
        setEvents(updatedEvents);
      } else {
        // Add new event
        const response = await axios.post('http://localhost:3019/api/events', formData);
        setEvents([...events, response.data]);
      }
      // Reset the form data
      setFormData({
        eventName: '',
        location: '',
        date: '',
        price: '',
        image: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting event:', error);
    }
  };

  return (
    <>
      <div className="manage-events-page">
        <h2>Manage Events</h2>
        <button className="add-event-btn" onClick={() => setShowForm(true)}>
          Add Event
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} className="event-form">
            <input
              type="text"
              placeholder="Event Name"
              value={formData.eventName}
              onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
        <table className="event-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id}>
                <td>{event.eventName}</td>
                <td>{event.desc}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>SAR{event.price}</td>
                <td>
                  <img src={event.image} alt={event.eventName} className="event-image" />
                </td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageEvents;

// ExplorePage.js
'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Link from 'next/link';

export default function ExplorePage () {

const router = useRouter();

  const [wishlist, setWishlist] = useState(new Set()); // State to store wishlist items
  const [tours, setTours] = useState([]);
  const [events, setEvents] = useState([]);

 // const [guides, setGuides] = useState([]);
  //const [events, setEvents] = useState([]);

  const handleBookNow = (type, id) => {
    router.push(`/tourdetail/${id}/${type}`)
  };

  const addToWishlist = async (id) => {
    try {
      const response = await axios.post(`/wishlist?tour_id=${id}`);
      if (response.status === 200) {
        setWishlist((prev) => {
          const newWishlist = new Set(prev);
          newWishlist.add(id);
          return newWishlist;
        });
        localStorage.setItem('wishlist', JSON.stringify([...wishlist, id]));
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = (id) => {
    try {
      // Create a copy of the current wishlist state
      const newWishlist = new Set(wishlist);
      // Remove the item from the copy
      newWishlist.delete(id);
      // Update the wishlist state with the new copy
      setWishlist(newWishlist);
      // Update local storage with the new wishlist
      localStorage.setItem('wishlist', JSON.stringify([...newWishlist]));
  
      // Update the button state to "Add to Wishlist" after removing the item
      const buttons = document.querySelectorAll(`.wishlist-btn[data-id="${id}"]`);
      buttons.forEach(button => {
        button.textContent = 'Add to Wishlist';
        button.classList.remove('active');
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };
  
  
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(new Set(JSON.parse(storedWishlist)));
    }
  }, []);

  // Function to check if an item is in the wishlist
  const isInWishlist = (id) => wishlist.has(id);

  // Function to fetch tour details
  const fetchTourDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3019/api/tours');
      if (response.status === 200) {
        setTours(response.data);
        return response.data; // Assuming the response contains tour details in JSON format
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching tour details:', error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchTourDetails(); // Fetch tour data when the component mounts
  }, []);

  // Function to fetch event details
  const fetchEventDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3019/api/events");
      if (response.status === 200) {
        setEvents(response.data);
        return response.data; // Assuming the response contains event details in JSON format
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchEventDetails(); // Fetch event data when the component mounts
  }, []);

  // Function to fetch guide details
  const fetchGuideDetails = async () => {
    try {
      const response = await axios.get('/api/guides');
      if (response.status === 200) {
        setGuides(response.data);
        return response.data; // Assuming the response contains guide details in JSON format
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching guide details:', error);
      // Handle error
    }
  };



//   const events = [
//     { id: 1, name: "Event 1", location: "Location 1", time: "10:00 AM", date: "2024-05-25", price: "$50", image: "https://c.myholidays.com/blog/blog/content/images/2020/10/A-Cosmopolitan-Delight-in-Saudi-Arabia.webp" },
//     { id: 2, name: "Event 2", location: "Location 2", time: "12:00 PM", date: "2024-05-26", price: "$75", image: "https://c.myholidays.com/blog/blog/content/images/2020/10/A-Cosmopolitan-Delight-in-Saudi-Arabia.webp" },
//     { id: 3, name: "Event 2", location: "Location 2", time: "12:00 PM", date: "2024-05-26", price: "$75", image: "https://c.myholidays.com/blog/blog/content/images/2020/10/A-Cosmopolitan-Delight-in-Saudi-Arabia.webp" },
//     { id: 4, name: "Event 2", location: "Location 2", time: "12:00 PM", date: "2024-05-26", price: "$75", image: "https://c.myholidays.com/blog/blog/content/images/2020/10/A-Cosmopolitan-Delight-in-Saudi-Arabia.webp" },
//     { id: 5, name: "Event 2", location: "Location 2", time: "12:00 PM", date: "2024-05-26", price: "$75", image: "https://c.myholidays.com/blog/blog/content/images/2020/10/A-Cosmopolitan-Delight-in-Saudi-Arabia.webp" },
//     // Add more event objects as needed
//   ];


  return (
    <>
      <div className="example-page">
        <section className="tours-section">
          <h2 className="section-heading">Tours</h2>
          <div className="card-container">
            {tours.map(tour => (
              <div key={tour._id} className="card">
                <img src={tour.image} alt={tour.tourName} />
                
                <div className="info">
                  <p><strong>Tour Guide:</strong> {tour.tourGuideName}</p>
                  <p><strong>Destinations:</strong> {tour.destinations}</p>
                  <p><strong>Price:</strong> SAR {tour.price}</p>
                  <button className="book-now-btn" onClick={() => handleBookNow('tour', tour._id)}>Book Now</button>
                  <button
                    className={`wishlist-btn ${isInWishlist(tour._id) ? 'active' : ''}`}
                    onClick={() => isInWishlist(tour._id) ? removeFromWishlist(tour._id) : addToWishlist(tour._id)}
                  >
                    {isInWishlist(tour._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="events-section">
          <h2 className="section-heading">Events</h2>
          <div className="card-container">
            {events.map(event => (
              <div key={event.id} className="card">
                <img src={event.image} alt={event.name} />
                <div className="info">
                  <h3>{event.name}</h3>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Price:</strong> {event.price}</p>
                  <button className="book-now-btn" onClick={() => handleBookNow('event', event._id)}>Book Now</button>
                  <button
                    className={`wishlist-btn ${isInWishlist(event._id) ? 'active' : ''}`}
                    onClick={() => isInWishlist(event._id) ? removeFromWishlist(event._id) : addToWishlist(event._id)}
                  >
                    {isInWishlist(event._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};


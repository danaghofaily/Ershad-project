// Wishlist.js
'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

/*
 useEffect(() => {
    // Fetch wishlist data from the API
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('/wishlist');
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };


    fetchWishlist();
  }, []);

*/

  useEffect(() => {
    // Dummy data for wishlist (replace with actual API data)
    const dummyWishlist = [
      { id: 1, name: "Tour 1", guide: "Guide 1", description: "Description 1", price: "$100", image: "https://c.myholidays.com/blog/blog/content/images/2020/10/A-Cosmopolitan-Delight-in-Saudi-Arabia.webp" },
      { id: 2, name: "Tour 2", guide: "Guide 2", description: "Description 2", price: "$150", image: "https://c.myholidays.com/blog/blog/content/images/2020/10/A-Cosmopolitan-Delight-in-Saudi-Arabia.webp" },
      // Add more wishlist items as needed
    ];

    setWishlist(dummyWishlist);
  }, []);

  const removeFromWishlist = async (id) => {
    console.log('Removing item with ID:', id);
    try {
     
     // await axios.delete(`/wishlist/${id}`);   Call delete API to remove item from wishlist
     
      // Update wishlist state after successful deletion
    
      setWishlist(wishlist.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      // Handle the error here, e.g., display an error message to the user
    }
  };
  

  return (
    <>
      <div className="wishlist-page">
        <h2>Wishlist</h2>
        <div className="wishlist-cards">
        {wishlist.map(item => (
        <div key={item.id} className="wishlist-card">
            <img src={item.image} alt={item.name} />
            <button
            className="remove-btn"
            onClick={() => removeFromWishlist(item.id)}
            >
            &#10006;
            </button>
            <div className="info">
            <h3>{item.name}</h3>
            <p><strong>Tour Guide:</strong> {item.guide}</p>
            <p>{item.description}</p>
            <p><strong>Price:</strong> {item.price}</p>
            {/* Additional details can be displayed */}
            </div>
        </div>
        ))}

        </div>
      </div>
    </>
  );
};

export default WishlistPage;

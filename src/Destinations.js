import React, { useState } from 'react';

const PlacesList = () => {
  const [placesData] = useState([
    {
      name: 'Hegra ALULA',
      image: 'https://static.wixstatic.com/media/f5dab6_d54aa32e97034e29ab49f4a2c3302ad5~mv2.jpg/v1/fill/w_925,h_618,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/f5dab6_d54aa32e97034e29ab49f4a2c3302ad5~mv2.jpg',
    },
    {
      name: 'Elephant Rock',
      image: 'https://static.wixstatic.com/media/f5dab6_7b0daa9a205a4a14902990824e5732a4~mv2.jpg/v1/fill/w_925,h_476,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/f5dab6_7b0daa9a205a4a14902990824e5732a4~mv2.jpg',
    },
    {
      name: 'Tantora',
      image: 'https://static.wixstatic.com/media/f5dab6_96af15e255a04fe994e2a1fa2dc50d41~mv2.jpg/v1/fill/w_925,h_694,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/f5dab6_96af15e255a04fe994e2a1fa2dc50d41~mv2.jpg',
    },
    {
      name: 'Jabal ithlib',
      image: 'https://static.wixstatic.com/media/f5dab6_a16e9b6ba0034c8db3dc8d8a752d4c2d~mv2.jpg/v1/fill/w_925,h_615,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/f5dab6_a16e9b6ba0034c8db3dc8d8a752d4c2d~mv2.jpg',
    },
    {
      name: 'The Oasis In the Desert',
      image: 'https://static.wixstatic.com/media/f5dab6_85f8bce284af4109ae6b5b56b09c5278~mv2.jpg/v1/fill/w_925,h_618,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/f5dab6_85f8bce284af4109ae6b5b56b09c5278~mv2.jpg',
    },
  ]);

  const [activitiesData] = useState([
    {
      name: 'Visit Al-Ula Old Town',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6mvlZuo7dYMFBuSJu1eXAm7-JgiDkGhySsSdqRFBe1A&s',
      description: 'Explore the ancient architecture and cultural heritage of Al-Ula Old Town.',
    },
    {
      name: 'Camel Rdie',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVHYwAYfJUnkZqYXqvwHqE8on3h_FlA_Afx3X3bzwijw&s',
      description: 'Discover the historical significance of the Madain Saleh Archaeological Site.',
    },
    {
      name: 'Take a Jeep Tour through the Desert',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUACSne-CYVqPM-91Ql1d_6kiRKvkE109tHRFL9tU8Q&s',
      description: 'Embark on an adventurous journey through the desert landscape in a Jeep tour.',
    },
    // Add more activities as needed
  ]);

  const [wishList, setWishList] = useState([]);

  // Function to add a place or activity to the wish list
  const addToWishList = (item) => {
    setWishList((prevWishList) => [...prevWishList, item]);
  };

  // Function to clear all items from the wish list
  const clearWishList = () => {
    setWishList([]);
  };

  return (
    <>
      <div className="places-list-container">
        <div className="background-image"></div>
        <div className="content">
          <div className="wish-list">
            <h2>Wish List</h2>
            <button onClick={clearWishList} className="clear-wish-list">Clear All Wish List</button>
            <ul>
              {wishList.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>
          <div className="places-container">
            {placesData.map((place, index) => (
              <div key={index} className="card">
                <h3 className="name">{place.name}</h3>
                <img src={place.image} alt={place.name} className="image" />
                <button onClick={() => addToWishList(place)} className="add-to-wishlist">
                  Add to Wish List
                </button>
              </div>
            ))}
          </div>
          <h2 style={{ textAlign: 'center', color: 'white', marginTop: '40px' }}>Activities</h2>
          <div className="activities-container">
            {activitiesData.map((activity, index) => (
              <div key={index} className="card">
                <h3 className="name">{activity.name}</h3>
                <img src={activity.image} alt={activity.name} className="image" />
                <p className="description">{activity.description}</p>
                <button onClick={() => addToWishList(activity)} className="add-to-wishlist">
                  Add to Wish List
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .places-list-container {
          position: relative;
          min-height: 100vh;
        }

        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://cdn.britannica.com/86/115086-050-0C320EC1/Camel-caravan-Sahara-Morocco.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.5;
        }

        .content {
          position: relative;
          z-index: 1;
          padding: 20px;
        }

        .places-container,
        .activities-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          padding: 20px;
        }

        .card {
          width: 300px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease-in-out;
          position: relative;
        }

        .card:hover {
          transform: scale(1.05);
        }

        .image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px 8px 0 0;
        }

        .name {
          padding: 10px;
          text-align: center;
          font-size: 18px;
        }

        .description {
          padding: 10px;
          font-size: 14px;
          line-height: 1.5;
        }

        .add-to-wishlist {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 10px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 0 0 8px 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .add-to-wishlist:hover {
          background-color: #45a049;
        }

        .wish-list {
          margin-top: 20px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.8);
        }

        .wish-list h2 {
          margin-bottom: 10px;
        }

        .wish-list ul {
          padding-left: 20px;
        }

        .wish-list li {
          margin-bottom: 5px;
        }

        .clear-wish-list {
          margin-top: 10px;
          padding: 5px 10px;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .clear-wish-list:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </>
  );
};

export default PlacesList;

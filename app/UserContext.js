// context/GlobalContext.js
'use client'

import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [touristid, setTouristId] = useState('');
  const [touristGuideId, setTouristGuideId] = useState('');
  const [ menuItems , setMenuItems ] = useState([]);
  const [usertType, setUserType] = useState('');
  const [isloggedIn, setisLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ username, setUsername, touristid, setTouristId, touristGuideId, setTouristGuideId, menuItems, setMenuItems, usertType, setUserType, isloggedIn, setisLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;


// utils/auth.js

export const setAuthToken = (token) => {
    if (token) {
      // Set the token in local storage
      localStorage.setItem('authToken', token);
    } else {
      // Remove the token from local storage if no token is provided
      localStorage.removeItem('authToken');
    }
  };
  
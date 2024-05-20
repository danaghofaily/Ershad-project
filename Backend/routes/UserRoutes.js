const express = require('express');
const router = express.Router();
const { createUser,deleteUser,getUsers,updateUser,loginUser  } = require('../controllers/UserController');

// Route to handle user creation
router.post('/users', createUser);
// Route to handle fetching all users
router.post('/login', loginUser);
router.get('/users', getUsers);
// Route to handle deleting a user by ID
// Route to handle deleting a user by ID
router.delete('/users/:userId', deleteUser);
//update the path
router.put('/users/:userId', updateUser);



module.exports = router;

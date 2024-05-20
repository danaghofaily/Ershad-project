const express = require('express');
const router = express.Router();
const touristController = require('../controllers/TouristController');

// Create a tourist
router.post('/tourists', touristController.createTourist);

// Read all tourists
router.get('/tourists', touristController.getAllTourists);

// Read a tourist by ID
router.get('/tourists/:id', touristController.getTouristById);

// Update a tourist by ID
router.patch('/tourists/:id', touristController.updateTouristById);

// Delete a tourist by ID
router.delete('/tourists/:id', touristController.deleteTouristById);

// Read a tourist by user_id
router.get('/tourists/user/:userId', touristController.getTouristByUserId);

module.exports = router;

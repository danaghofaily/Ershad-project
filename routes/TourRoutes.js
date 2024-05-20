const express = require('express');
const router = express.Router();
const tourController = require('../controllers/TourController');

// Create a tour
router.post('/tours', tourController.createTour);

// Get all tours
router.get('/tours/:guideId/guide', tourController.getAllTours);


router.get('/tours', tourController.getAllToursOrg);

// Get a tour by ID
router.get('/tours/:id', tourController.getTourById);

// Update a tour by ID
router.put('/tours/:id', tourController.updateTourById);

// Delete a tour by ID
router.delete('/tours/:id', tourController.deleteTourById);

module.exports = router;

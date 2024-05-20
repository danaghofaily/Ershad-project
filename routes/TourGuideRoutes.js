const express = require('express');
const router = express.Router();
const tourGuideController = require('../controllers/TourGuideController');

// Create a tour guide
router.post('/tourguides', tourGuideController.createTourGuide);

router.get('/tourguides/unapproved', tourGuideController.getUnapprovedTourGuides);

// Get all tour guides
router.get('/tourguides', tourGuideController.getAllTourGuides);

// Get a tour guide by ID
router.get('/tourguides/:id', tourGuideController.getTourGuideById);

// Update a tour guide by ID
router.patch('/tourguides/:id', tourGuideController.updateTourGuideById);

// Get a tour guide by user_id
router.get('/tourguides/user/:userId', tourGuideController.getTourGuideByUserId);

// Update a tour guide by user_id
router.patch('/tourguides/user/:userId', tourGuideController.updateTourGuideByUserId);

// Update a tour guide by user_id
router.patch('/tourguides/:id/approve', tourGuideController.approveTourGuide);

module.exports = router;

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');

// Create a review
router.post('/reviews', reviewController.createReview);

// Get all reviews
router.get('/reviews', reviewController.getAllReviews);

// Get a review by ID
router.get('/reviews/:id', reviewController.getReviewById);

// Update a review by ID
router.patch('/reviews/:id', reviewController.updateReviewById);

// Delete a review by ID
router.delete('/reviews/:id', reviewController.deleteReviewById);

// Update a review by ID
router.patch('/reviews/:id/approve', reviewController.approveReview);




module.exports = router;

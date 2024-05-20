const Review = require('../models/ReviewModel');

// Function to create a review
const createReview = async (req, res) => {
    try {
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get a review by ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update a review by ID
const updateReviewById = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete a review by ID
const deleteReviewById = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(deletedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const approveReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Update the approval status
        review.approve = true;
        await review.save();

        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReviewById,
    deleteReviewById,
    approveReview
};

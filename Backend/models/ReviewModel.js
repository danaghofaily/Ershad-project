const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    activity_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reviewDescription: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    approve: {
        type: Boolean,
        default: false
    },
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reviewer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tourists', // Assuming you have a User model
        required: true
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;

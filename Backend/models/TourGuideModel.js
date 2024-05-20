const mongoose = require('mongoose');

const TourGuideSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tourGuideName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pricePerVisit: {
        type: Number,
        required: true
    }
});

const TourGuide = mongoose.model('TourGuide', TourGuideSchema);

module.exports = TourGuide;

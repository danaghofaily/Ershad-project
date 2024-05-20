const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    tourName: {
        type: String,
        required: true
    },
    destinations: {
        type: [String],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    guide_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourGuide',
        required: true
    }
});

const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour;

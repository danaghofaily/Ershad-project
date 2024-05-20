const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    tourist_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourist',
        required: true
    },
    type: {
        type: String,
        enum: ['tourguide', 'events', 'tour'],
        required: true
    },
    activity_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Reject'],
        required: true,
        default: 'Pending'
    },
    reviewed: {
        type: Boolean,
        default: false
    }
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;

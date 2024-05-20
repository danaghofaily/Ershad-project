const mongoose = require('mongoose');

const TouristSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    touristName: {
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
    }
});

const Tourist = mongoose.model('Tourist', TouristSchema);

module.exports = Tourist;

const mongoose = require('mongoose');
const { type } = require('os');

const activitySchema = new mongoose.Schema({
    activityId: {
        type: Number,
        unique: true,
    },
    activityName:{
        type: String
    },
    activityType: {
        type: String,
        enum: ['event', 'place', 'attraction', 'accomodation'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    image_url: {
        type: String
    },
    description: {
        type: String
    }
});

// Auto-increment activityId field
activitySchema.pre('save', async function(next) {
    if (this.isNew) {
        const highestActivity = await Activity.findOne().sort({ activityId: -1 });
        if (highestActivity) {
            this.activityId = highestActivity.activityId + 1;
        } else {
            this.activityId = 1;
        }
    }
    next();
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

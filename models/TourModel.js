// TourGuide model
const mongoose = require('mongoose');

const tourGuideSchema = new mongoose.Schema({
  tourGuideId: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  name: String,
  gender: String,
  image_url: String,
  destinations: [String],
  charges_per_day: Number,
  approved: { type: Boolean, default: false }
});

const TourGuide = mongoose.model('TourGuide', tourGuideSchema);

module.exports = TourGuide;

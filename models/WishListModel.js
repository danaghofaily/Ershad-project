// Import Mongoose
const mongoose = require('mongoose');

// Define the Wishlist schema
const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

// Create the Wishlist model based on the schema
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

// Export the Wishlist model
module.exports = Wishlist;
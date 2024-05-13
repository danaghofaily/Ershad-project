// Require the Express module
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TourGuide =require('./models/TourModel');
const tourGuideRoutes = require('./routes/TourGuideRoutes');
// Create an instance of Express
const app = express();
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
const UserRoutes=require('./routes/UserRoutes');

mongoose.connect('mongodb://localhost:27017/student', {
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});
//middleware
app.use(express.json());

// Mount the user routes
app.use('/api', UserRoutes);
app.use('/api', tourGuideRoutes)
// Start the server on port 3000
let wishList = [];

// Route to add an item to the wish list
app.post('/api/add-to-wishlist', (req, res) => {
  const { place } = req.body;
  wishList.push(place);
  res.status(200).json({ message: 'Item added to wish list', wishList });
});
app.put('/api/tour-guides/:id', async (req, res) => {
    try {
      const updatedTourGuide = await TourGuide.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedTourGuide) {
        return res.status(404).json({ success: false, error: 'Tour guide not found' });
      }
  
      res.status(200).json({ success: true, data: updatedTourGuide });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
 
  const reviewSchema = new mongoose.Schema({
    tourGuideName: String,
    comment: String,
  });
  
  // Create a model based on the schema
  const Review = mongoose.model('Review', reviewSchema);
  
  app.post('/tour-guide/review', async (req, res) => {
    const { tourGuideName, comment } = req.body;
  
    if (!tourGuideName || !comment) {
      return res.status(400).json({ message: 'Please provide tourGuideName and comment' });
    }
  
    try {
      // Create a new review document
      const newReview = new Review({ tourGuideName, comment });
      await newReview.save();
      res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ message: 'Error adding review' });
    }
  });
  
  app.get('/tour-guide/reviews', async (req, res) => {
    try {
      // Fetch all reviews from the database
      const reviews = await Review.find();
      res.json({ reviews });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Error fetching reviews' });
    }
  });
  app.delete('/tour-guide/review/:id', async (req, res) => {
    const reviewId = req.params.id;
  
    try {
      // Find the review by ID and delete it
      const deletedReview = await Review.findByIdAndDelete(reviewId);
  
      if (!deletedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.json({ message: 'Review deleted successfully', deletedReview });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ message: 'Error deleting review' });
    }
  });
  
  



app.listen(3019, () => {
    console.log('Server is running on http://localhost:3019');
});

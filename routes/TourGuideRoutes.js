const express = require('express');
const TourGuide =require('../models/TourModel')
const router = express.Router();
const {
  createTourGuide,
  loginTourGuide,
  getAllTourGuides,
  getTourGuideById,
  updateTourGuideById,
  deleteTourGuideById,
  approveTourGuide,
  updateGuideProfile
  
} = require('../controllers/TourController');

// Route to create a new tour guide
router.post('/tour-guides', createTourGuide);
router.post('/tourlogin', loginTourGuide);
router.get('/tour-guides/:tourGuideId', async (req, res) => {
  try {
    const tourGuide = await TourGuide.findOne({ tourGuideId: req.params.tourGuideId });
    if (!tourGuide) {
      return res.status(404).json({ message: 'Tour guide not found' });
    }
    // If tour guide found, send the details
    res.status(200).json(tourGuide);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ message: error.message });
  }
})
// Route to get all tour guides
router.get('/tour-guides', getAllTourGuides);

// Route to approve a tour guide
router.put('/tour-guides/:id/approve', approveTourGuide);

// Additional routes for getting, updating, and deleting a single tour guide by ID
router.get('/tour-guides/:id', getTourGuideById);
router.delete('/tour-guides/:id', deleteTourGuideById);
router.put('/updates', async (req, res) => {
  try {
    // Extract the guide ID from the request body
    const guideId = req.body.id;
    
    // Retrieve the updated information from the request body
    const { name, gender, image_url, destinations, charges_per_day } = req.body;

    // Find the tour guide in the database using the guide ID
    const tourGuide = await TourGuide.findById(guideId);
    if (!tourGuide) {
      return res.status(404).json({ message: 'Tour guide not found' });
    }

    // Update the tour guide's information with the new data
    tourGuide.name = name;
    tourGuide.gender = gender;
    tourGuide.image_url = image_url;
    tourGuide.destinations = destinations;
    tourGuide.charges_per_day = charges_per_day;

    // Save the updated tour guide
    const updatedTourGuide = await tourGuide.save();

    // Return the updated tour guide as the response
    res.json(updatedTourGuide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

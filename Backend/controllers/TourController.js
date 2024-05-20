const Tour = require('../models/TourModel');
const TourGuide = require('../models/TourGuideModel');
const Review = require('../models/ReviewModel');

// Function to create a tour
const createTour = async (req, res) => {
    try {
        const newTour = new Tour(req.body);
        const savedTour = await newTour.save();
        res.status(201).json(savedTour);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to get all tours
const getAllTours = async (req, res) => {
    try {
        // Extract the guideId from the request parameters
        const { guideId } = req.params;

        // Fetch tours only for the specific guideId
        const tours = await Tour.find({ guide_id: guideId });
        
        // Fetch the TourGuide name for the specific guideId
        const tourGuide = await TourGuide.findById(guideId);
        
        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found' });
        }

        // Add the TourGuide name to the tours
        const toursWithGuideName = tours.map(tour => ({
            ...tour._doc, // Include existing tour properties
            tourGuideName: tourGuide.tourGuideName // Add TourGuide name
        }));

        res.json(toursWithGuideName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllToursOrg = async (req, res) => {
    try {
        // Fetch all tours

        
        const tours = await Tour.find();
        
        // Extract guide IDs from the tours
        const guideIds = tours.map(tour => tour.guide_id);
        
        // Fetch TourGuide names based on the guide IDs
        const tourGuideNames = await TourGuide.find({_id: {$in: guideIds}});
        
        // Map tourGuideNames to an object for easy lookup
        const tourGuideNamesMap = {};
        tourGuideNames.forEach(tourGuide => {
            tourGuideNamesMap[tourGuide._id.toString()] = tourGuide.tourGuideName;
        });
        
        // Add TourGuide names to the tours
        const toursWithGuideNames = tours.map(tour => {
            return {
                ...tour._doc, // Include existing tour properties
                tourGuideName: tourGuideNamesMap[tour.guide_id.toString()] // Add TourGuide name
            };
        });

        res.json(toursWithGuideNames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Function to get a tour by ID
const getTourById = async (req, res) => {
    try {
        // Fetch the tour by ID and populate the guide_id field
        const tour = await Tour.findById(req.params.id).populate('guide_id');
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        
        // Fetch reviews corresponding to the tour using the activity_id field
        const reviews = await Review.find({ activity_id: tour._id });
        
        // Add the reviews array to the tour object
        const tourWithReviews = {
            ...tour.toObject(), // Convert Mongoose document to plain JavaScript object
            reviews: reviews
        };
        
        res.json(tourWithReviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Function to update a tour by ID
const updateTourById = async (req, res) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.json(updatedTour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete a tour by ID
const deleteTourById = async (req, res) => {
    try {
        const deletedTour = await Tour.findByIdAndDelete(req.params.id);
        if (!deletedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.json(deletedTour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTour,
    getAllTours,
    getTourById,
    updateTourById,
    deleteTourById,
    getAllToursOrg
};

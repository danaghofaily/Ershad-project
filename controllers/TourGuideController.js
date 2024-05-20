const TourGuide = require('../models/TourGuideModel');

// Create a tour guide
const createTourGuide = async (req, res) => {
    try {
        const newTourGuide = new TourGuide(req.body);
        const savedTourGuide = await newTourGuide.save();
        res.status(201).json(savedTourGuide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tour guides
const getAllTourGuides = async (req, res) => {
    try {
        const tourGuides = await TourGuide.find();
        res.json(tourGuides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a tour guide by ID
const getTourGuideById = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findById(req.params.id);
        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found' });
        }
        res.json(tourGuide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a tour guide by ID
const updateTourGuideById = async (req, res) => {
    try {
        const updatedTourGuide = await TourGuide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTourGuide) {
            return res.status(404).json({ message: 'Tour guide not found' });
        }
        res.json(updatedTourGuide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a tour guide by user_id
const getTourGuideByUserId = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findOne({ user_id: req.params.userId });
        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found' });
        }
        res.json(tourGuide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a tour guide by user_id
const updateTourGuideByUserId = async (req, res) => {
    try {
        const updatedTourGuide = await TourGuide.findOneAndUpdate({ user_id: req.params.userId }, req.body, { new: true });
        if (!updatedTourGuide) {
            return res.status(404).json({ message: 'Tour guide not found' });
        }
        res.json(updatedTourGuide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTourGuideApprovalById = async (req, res) => {
    try {
        const tourGuideId = req.params.tourGuideId;

        const guide = await TourGuide.findById(tourGuideId);
        guide.approved = true;

        guide.save()

        // Return the updated tour guide
        res.json(updatedTourGuide);
    } catch (error) {
        // If an error occurs, return a 500 error with the error message
        res.status(500).json({ message: error.message });
    }
};


const approveTourGuide = async (req, res) => {
    try {
        const { id } = req.params;
        const tourGuide = await TourGuide.findById(id);

        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found' });
        }

        // Update the approval status
        tourGuide.approved = true;
        await tourGuide.save();

        res.json(tourGuide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUnapprovedTourGuides = async (req, res) => {
    try {
        const unapprovedTourGuides = await TourGuide.find({ approved: false });
        res.json(unapprovedTourGuides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTourGuide,
    getAllTourGuides,
    getTourGuideById,
    updateTourGuideById,
    getTourGuideByUserId,
    updateTourGuideByUserId,
    approveTourGuide,
    getUnapprovedTourGuides,
};

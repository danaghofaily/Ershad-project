const Tourist = require('../models/TouristModel');

// Create a tourist
const createTourist = async (req, res) => {
    try {
        const newTourist = new Tourist(req.body);
        const savedTourist = await newTourist.save();
        res.status(201).json(savedTourist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read all tourists
const getAllTourists = async (req, res) => {
    try {
        const tourists = await Tourist.find();
        res.json(tourists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read a tourist by ID
const getTouristById = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.params.id);
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }
        res.json(tourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a tourist by ID
const updateTouristById = async (req, res) => {
    try {
        const updatedTourist = await Tourist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }
        res.json(updatedTourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a tourist by ID
const deleteTouristById = async (req, res) => {
    try {
        const deletedTourist = await Tourist.findByIdAndDelete(req.params.id);
        if (!deletedTourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }
        res.json(deletedTourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read a tourist by user_id
const getTouristByUserId = async (req, res) => {
    try {
        const tourist = await Tourist.findOne({ user_id: req.params.userId });
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }
        res.json(tourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTouristByUserId = async (req, res) => {
    try {
        const updatedTourist = await Tourist.findOneAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }
        res.json(updatedTourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    createTourist,
    getAllTourists,
    getTouristById,
    updateTouristById,
    deleteTouristById,
    getTouristByUserId,
    updateTouristById
};

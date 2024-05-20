const Event = require('../models/EventModel');
const Review = require('../models/ReviewModel');


// Create an event
const createEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read an event by ID
const getEventById = async (req, res) => {
    try {
        // Fetch the event by ID
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        // Fetch reviews corresponding to the event using the activity_id field
        const reviews = await Review.find({ activity_id: event._id });
        
        // Add the reviews array to the event object
        const eventWithReviews = {
            ...event.toObject(), // Convert Mongoose document to plain JavaScript object
            reviews: reviews
        };
        
        res.json(eventWithReviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update an event by ID
const updateEventById = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an event by ID
const deleteEventById = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(deletedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById
};

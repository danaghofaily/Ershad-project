const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');

// Create an event
router.post('/events', eventController.createEvent);

// Read all events
router.get('/events', eventController.getAllEvents);

// Read an event by ID
router.get('/events/:id', eventController.getEventById);

// Update an event by ID
router.put('/events/:id', eventController.updateEventById);

// Delete an event by ID
router.delete('/events/:id', eventController.deleteEventById);

module.exports = router;

// routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const { createActivity, getActivities, getActivityById, updateActivity, deleteActivity } = require('../controllers/ActivityController')

// Create
router.post('/activity', createActivity);

// Read
router.get('/activity', getActivities);
router.get('/activity/:id', getActivityById);

// Update
router.put('/activity/:id', updateActivity);

// Delete
router.delete('/activity/:id', deleteActivity);

module.exports = router;

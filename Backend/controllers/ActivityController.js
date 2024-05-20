const { get } = require('http');
const Activity = require('../models/ActivityModel');

const createActivity = async (req, res) => {
    try {
        const newActivity = new Activity(req.body);
        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({ error: 'Error creating activity' });
    }
};


const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Error fetching activities' });
    }
};

const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findOne({ activityId: id });
        if (activity) {
            res.status(200).json(activity);
        } else {
            res.status(404).json({ error: 'Activity not found' });
        }
    } catch (error) {
        console.error('Error fetching activity:', error);
        res.status(500).json({ error: 'Error fetching activity' });
    }
};


const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedActivity = await Activity.findOneAndUpdate({ activityId: id }, updateData, { new: true });
        if (updatedActivity) {
            res.status(200).json(updatedActivity);
        } else {
            res.status(404).json({ error: 'Activity not found' });
        }
    } catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).json({ error: 'Error updating activity' });
    }
};

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedActivity = await Activity.findOneAndDelete({ activityId: id });
        if (deletedActivity) {
            res.status(200).json(deletedActivity);
        } else {
            res.status(404).json({ error: 'Activity not found' });
        }
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ error: 'Error deleting activity' });
    }
};

module.exports = {createActivity,getActivities,getActivityById,updateActivity, deleteActivity };


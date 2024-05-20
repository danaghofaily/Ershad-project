
const mongoose = require('mongoose');
const User = require('../models/UserModel');
const Activity = require("../models/ActivityModel")
const Wishlist = require("../models/WishListModel")

  // Create a new wishlist item
const createWishlistItem =  async (req, res) => {
    try {
      const { userId, activityId } = req.body;


      const newWishlistItem = new Wishlist({
        userId,
        activityId
      });

      const savedWishlistItem = await newWishlistItem.save();
      res.status(201).json(savedWishlistItem);
    } catch (error) {
      console.error('Error creating wishlist item:', error.message);
      res.status(500).json({ message: 'Failed to create wishlist item', error: error.message });
    }
  };

  // Get all wishlist items
const getWishlistItemsByUserId  = async(req, res)  => {
    try {
      const { userId } = req.params;

      const wishlistItems = await Wishlist.find({ userId: userId });

      if (wishlistItems.length === 0) {
        return res.status(404).json({ message: 'No wishlist items found for the specified user' });
      }

      res.status(200).json(wishlistItems);
    } catch (error) {
      console.error('Error fetching wishlist items by userId:', error.message);
      res.status(500).json({ message: 'Failed to fetch wishlist items', error: error.message });
    }
  }


  // Delete wishlist items by userId
const deleteWishlistItemsByUserId =  async (req, res)=> {
    try {
      const { userId } = req.params;

      const user = await User.findOne({ username: userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const ID = user._id;
  
      // Delete wishlist items that match the userId
      const deleteResult = await Wishlist.deleteMany({ userId: ID });

      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ message: 'No wishlist items found for the specified user' });
      }

      res.status(200).json({ message: 'Wishlist items deleted successfully', deleteResult });
    } catch (error) {
      console.error('Error deleting wishlist items by userId:', error.message);
      res.status(500).json({ message: 'Failed to delete wishlist items', error: error.message });
    }
  }


module.exports = {createWishlistItem,getWishlistItemsByUserId,deleteWishlistItemsByUserId};

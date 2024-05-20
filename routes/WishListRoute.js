const express = require('express');
const router = express.Router();
const { createWishlistItem,deleteWishlistItemsByUserId,getWishlistItemsByUserId  } = require('../controllers/WishListController');

// Route to handle wishlist creation
router.post('/wishlist', createWishlistItem);
// Route to handle wishList based on userID
router.get('/wishlist/:userId', getWishlistItemsByUserId);
// Route to handle deleting a user by ID
router.delete('/wishlist/:userId', deleteWishlistItemsByUserId);


module.exports = router;

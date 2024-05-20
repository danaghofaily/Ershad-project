const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, updateBookingById, deleteBookingById, confirmBooking ,getBookingByGuide, getBookingsByTouristId, getBookingsByUserId, getCompletedBookings, getBookingById, updateBookingStatus } = require('../controllers/BookingController');

// Route to handle user creation
router.post('/booking', createBooking); // Create
router.get('/booking', getAllBookings); // Read (Retrieve all)
router.put('/booking/:bookingId', updateBookingById); // Update
router.delete('/booking/:bookingId', deleteBookingById); // Delete
router.put('/booking/:bookingId/confirm', confirmBooking); //Confirm Booking
router.get('/booking/:guideId/guide',getBookingByGuide ); // Get booking by tourist guide
router.get('/booking/:touristid/tourguide', getBookingByGuide);

router.get('/bookings/user/:userId', getBookingsByUserId);
router.get('/bookings/completed', getCompletedBookings);
router.get('/bookings/:touristId/tourist', getBookingsByTouristId);
router.get('/booking/:bookingId', getBookingById);
router.patch('/booking/:bookingid/:status/status', updateBookingStatus);




// Route to handle fetching all users
// router.post('/login', loginUser);
// router.get('/users', getUsers);
// // Route to handle deleting a user by ID
// // Route to handle deleting a user by ID
// router.delete('/users/:userId', deleteUser);
// //update the path
// router.put('/users/:userId', updateUser);



module.exports = router;

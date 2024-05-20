const Booking = require('../models/BookingModel');
const Tourist = require('../models/TouristModel');
const Tour = require('../models/TourModel');
const Event = require('../models/EventModel');
const TourGuide = require('../models/TourGuideModel');

// Create a booking
const createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read all bookings
// const getAllBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find();
//         res.json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const getAllBookings = async (req, res) => {
    try {
        // Fetch all completed bookings
        const completedBookings = await Booking.find();

        // Iterate over each completed booking
        const enrichedBookings = await Promise.all(completedBookings.map(async (booking) => {
            // Determine the type of the booking
            const type = booking.type;
            let activityData;
            let touristData;

            // Fetch additional data based on the type
            if (type === "tour") {
                activityData = await Tour.findById(booking.activity_id);
            } else if (type === "event") {
                activityData = await Event.findById(booking.activity_id);
            }

            // Fetch tourist data
            touristData = await Tourist.findById(booking.tourist_id);

            // Create an enriched booking object with additional activity data and tourist data
            return {
                booking: booking,
                activityData: activityData,
                touristData: touristData
            };
        }));

        // Return the enriched bookings array
        res.json(enrichedBookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const bookingId = req.params.bookingid;
        const newStatus = req.params.status;

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: newStatus },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCompletedBookings = async (req, res) => {
    try {
        // Fetch all completed bookings
        const completedBookings = await Booking.find({ status: "Completed" });

        // Iterate over each completed booking
        const enrichedBookings = await Promise.all(completedBookings.map(async (booking) => {
            // Determine the type of the booking
            const type = booking.type;
            let activityData;

            // Fetch additional data based on the type
            if (type === "tour") {
                activityData = await Tour.findById(booking.activity_id);
            } else if (type === "event") {
                activityData = await Event.findById(booking.activity_id);
            }

            // Create an enriched booking object with additional activity data
            return {
                booking: booking,
                activityData: activityData
            };
        }));

        // Return the enriched bookings array
        res.json(enrichedBookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        // Fetch the booking by ID
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Determine the type of the booking
        const type = booking.type;
        let activityData;

        // Fetch additional data based on the type
        if (type === "tour") {
            activityData = await Tour.findById(booking.activity_id);
        } else if (type === "event") {
            activityData = await Event.findById(booking.activity_id);
        }

        // Create an enriched booking object with additional activity data
        const enrichedBooking = {
            booking: booking,
            activityData: activityData
        };

        // Return the enriched booking
        res.json(enrichedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a booking by ID
const updateBookingById = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a booking by ID
const deleteBookingById = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(deletedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookingsByTouristId = async (req, res) => {
  try {
      // Find all bookings with the specified tourist_id
      const bookings = await Booking.find({ tourist_id: req.params.touristId });
        // Iterate over each completed booking
        const enrichedBookings = await Promise.all(bookings.map(async (booking) => {
            // Determine the type of the booking
            const type = booking.type;
            let activityData;

            // Fetch additional data based on the type
            if (type === "tour") {
                activityData = await Tour.findById(booking.activity_id);
            } else if (type === "event") {
                activityData = await Event.findById(booking.activity_id);
            }

            // Create an enriched booking object with additional activity data
            return {
                booking: booking,
                activityData: activityData
            };
        }))
        res.json(enrichedBookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


const confirmBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        // Update the booking document with the new status based on bookingId
        const updatedBooking = await Booking.findById(bookingId);

        updatedBooking.status = 'confirmed';
        updatedBooking.save();
        // Check if the booking was found and updated successfully
        if (updatedBooking) {
            res.status(200).json(updatedBooking);
        } else {
            // If the booking with the specified bookingId was not found
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Error updating booking' });
    }
};

    const getBookingByGuide = async (req, res) => {
        try {
            const { guideId } = req.params;

            const guide = TourGuide.findById(guideId);
            if(!guide){
                res.status(404).json({ error: 'No Guide found' });
            }
            const query = {"type" : "tour"};

            const guideBookings = await Booking.find(query);

            const enrichedBookings = await Promise.all(guideBookings.map(async (booking) => {
                // Determine the type of the booking
                const type = booking.type;
                let activityData;
                
                // Fetch additional data based on the type
                if (type === "tour") {
                    activityData = await Tour.findById(booking.activity_id);

                    if (activityData.guide_id.toString() != guideId){
                        return {}
                    }
                } else if (type === "event") {
                    activityData = await Event.findById(booking.activity_id);
                }
                // Create an enriched booking object with additional activity data
                return {
                    booking: booking,
                    activityData: activityData
                };
            }));
            
            const filteredArray = enrichedBookings.filter(obj => Object.keys(obj).length !== 0);

            res.json(filteredArray);

        } catch (error) {
            console.error('Error getting bookings:', error);
            res.status(500).json({ error: 'Error getting bookings' });
        }
    };

    const getBookingsByUserId = async (req, res) => {
        try {
            // Find the tourist ID based on the user ID
            const tourist = await Tourist.findOne({ user_id: req.params.userId });
            if (!tourist) {
                return res.status(404).json({ message: 'Tourist not found for the user ID' });
            }
    
            // Find bookings based on the tourist ID
            const bookings = await Booking.find({ tourist_id: tourist._id });
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
  
module.exports = { createBooking, getAllBookings, updateBookingById, deleteBookingById, confirmBooking, getBookingByGuide, getBookingsByTouristId, getBookingById, getBookingsByUserId, getCompletedBookings, updateBookingStatus };

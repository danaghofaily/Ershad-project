const Payment = require('../models/PaymentModel');
const Booking = require('../models/BookingModel'); // Assuming Booking model exists

// Create a new payment
exports.createPayment = async (req, res) => {
    try {
        const { booking_id, activity_id, commission } = req.body;

        // Validate booking and activity existence
        const booking = await Booking.findById(booking_id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const payment = new Payment({
            booking_id,
            activity_id,
            commission
        });

        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all payments
exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('booking_id activity_id');
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('booking_id activity_id');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a payment
exports.updatePayment = async (req, res) => {
    try {
        const { booking_id, activity_id, paymentStatus, commission } = req.body;
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Validate booking and activity existence if they are being updated
        if (booking_id && booking_id !== payment.booking_id.toString()) {
            const booking = await Booking.findById(booking_id);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            payment.booking_id = booking_id;
        }

        if (activity_id && activity_id !== payment.activity_id.toString()) {
            const activity = await Activity.findById(activity_id);
            if (!activity) {
                return res.status(404).json({ message: 'Activity not found' });
            }
            payment.activity_id = activity_id;
        }

        payment.paymentStatus = paymentStatus !== undefined ? paymentStatus : payment.paymentStatus;
        payment.commission = commission !== undefined ? commission : payment.commission;

        await payment.save();
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.approvePayment = async (req, res) => {
    try {

        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        payment.paymentStatus = true;
        await payment.save();
        res.status(200).json(payment);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

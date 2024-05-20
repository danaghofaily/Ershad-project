const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    activity_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    paymentStatus: {
        type: Boolean,
        default: false
    },
    commission: {
        type: Number,
        required: true
    }
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;

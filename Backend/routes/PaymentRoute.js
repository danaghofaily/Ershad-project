const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');

router.post('/payment', paymentController.createPayment);
router.get('/payment', paymentController.getPayments);
router.get('/payment/:id', paymentController.getPaymentById);
router.put('/payment/:id', paymentController.updatePayment);
router.delete('/payment/:id', paymentController.deletePayment);
router.patch('/payment/:id/approve', paymentController.approvePayment);

module.exports = router;

const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");

router.post("/payments/create-order", paymentController.createOrder);
router.post("/payments/verify", paymentController.verifyPayment);

module.exports = router;

const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");

router.post("/auth/signup", controller.signup);
router.post("/auth/login", controller.login);

router.post("/bookings", controller.createBooking);
router.post("/contact", controller.createContactMessage);

module.exports = router;

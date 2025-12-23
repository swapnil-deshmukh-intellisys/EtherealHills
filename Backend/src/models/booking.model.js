const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    numberOfMales: { type: String, default: "" },
    numberOfFemales: { type: String, default: "" },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    selectedSeats: { type: [String], default: [] },
    stayType: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);

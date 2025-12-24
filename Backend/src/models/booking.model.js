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
    selectedTents: { type: [Number], default: [] },
    selectedSeats: { type: [String], default: [] },
    stayType: { type: String, default: "" },
    bookingDate: { type: String, default: "" },
    bookingId: { type: String, default: "" },
    payment: {
      status: {
        type: String,
        enum: ["pending", "created", "paid", "failed"],
        default: "pending",
      },
      amountInr: { type: Number, default: 0 },
      currency: { type: String, default: "INR" },
      razorpayOrderId: { type: String, default: "" },
      razorpayPaymentId: { type: String, default: "" },
      razorpaySignature: { type: String, default: "" },
      verifiedAt: { type: Date },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);

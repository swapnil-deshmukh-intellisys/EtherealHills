const crypto = require("crypto");
const Razorpay = require("razorpay");

const Booking = require("../models/booking.model");
const { AppError } = require("../utils/errorHandler");

function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    const missing = [];
    if (!keyId) missing.push("RAZORPAY_KEY_ID");
    if (!keySecret) missing.push("RAZORPAY_KEY_SECRET");
    throw new AppError(`Razorpay keys are not configured (missing: ${missing.join(", ")})`, 500);
  }

  return {
    keyId,
    instance: new Razorpay({ key_id: keyId, key_secret: keySecret }),
  };
}

async function createOrder(req, res, next) {
  try {
    const { amountInr, bookingId, receipt } = req.body;

    const amountNumber = Number(amountInr);
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      throw new AppError("amountInr must be a positive number", 400);
    }

    if (!bookingId) {
      throw new AppError("bookingId is required", 400);
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new AppError("Booking not found", 404);

    const { keyId, instance } = getRazorpayInstance();

    const order = await instance.orders.create({
      amount: Math.round(amountNumber * 100),
      currency: "INR",
      receipt: receipt || `EH-${bookingId}`,
      notes: {
        bookingId: bookingId.toString(),
      },
    });

    booking.payment = {
      ...(booking.payment || {}),
      status: "created",
      amountInr: amountNumber,
      currency: "INR",
      razorpayOrderId: order.id,
    };
    await booking.save();

    res.json({ ok: true, keyId, order });
  } catch (err) {
    next(err);
  }
}

function computeSignature(orderId, paymentId, secret) {
  const payload = `${orderId}|${paymentId}`;
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

async function verifyPayment(req, res, next) {
  try {
    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!bookingId) throw new AppError("bookingId is required", 400);
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new AppError("Missing Razorpay verification fields", 400);
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) throw new AppError("Razorpay keys are not configured", 500);

    const expected = computeSignature(razorpay_order_id, razorpay_payment_id, keySecret);

    const ok =
      expected.length === razorpay_signature.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));

    if (!ok) {
      throw new AppError("Invalid payment signature", 400);
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new AppError("Booking not found", 404);

    booking.payment = {
      ...(booking.payment || {}),
      status: "paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      verifiedAt: new Date(),
    };
    await booking.save();

    res.json({ ok: true, booking });
  } catch (err) {
    next(err);
  }
}

module.exports = { createOrder, verifyPayment };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Booking = require("../models/booking.model");
const ContactMessage = require("../models/contactMessage.model");
const { AppError } = require("../utils/errorHandler");

function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role, email: user.email },
    process.env.JWT_SECRET || "change_me",
    { expiresIn: "7d" }
  );
}

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new AppError("Email and password are required", 400);

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) throw new AppError("User already exists", 409);

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email: email.toLowerCase().trim(), passwordHash });

    const token = signToken(user);
    res.status(201).json({ ok: true, token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new AppError("Email and password are required", 400);

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) throw new AppError("Invalid email or password", 401);

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new AppError("Invalid email or password", 401);

    const token = signToken(user);
    res.json({ ok: true, token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}

async function createBooking(req, res, next) {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ ok: true, booking });
  } catch (err) {
    next(err);
  }
}

async function createContactMessage(req, res, next) {
  try {
    const msg = await ContactMessage.create(req.body);
    res.status(201).json({ ok: true, message: msg });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signup,
  login,
  createBooking,
  createContactMessage,
};

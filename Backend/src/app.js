const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/user.routes");
const paymentRoutes = require("./routes/payment.routes");
const { notFoundHandler, errorHandler } = require("./utils/errorHandler");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const raw = process.env.CORS_ORIGIN || "http://localhost:3000";
      const allowedOrigins = raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => (s.startsWith("http") ? s : `https://${s}`));

      // allow non-browser tools / same-origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api", userRoutes);
app.use("/api", paymentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

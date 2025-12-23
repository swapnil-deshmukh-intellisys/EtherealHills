const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/user.routes");
const { notFoundHandler, errorHandler } = require("./utils/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api", userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

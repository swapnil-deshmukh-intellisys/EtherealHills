class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

function notFoundHandler(req, res, next) {
  next(new AppError("Route not found", 404));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    ok: false,
    message,
  });
}

module.exports = { AppError, notFoundHandler, errorHandler };

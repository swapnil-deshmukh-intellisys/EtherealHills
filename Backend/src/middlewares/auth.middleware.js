const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/errorHandler");

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return next(new AppError("Unauthorized", 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "change_me");
    req.user = payload;
    return next();
  } catch (e) {
    return next(new AppError("Unauthorized", 401));
  }
}

module.exports = { auth };

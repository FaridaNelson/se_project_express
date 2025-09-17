const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // 1. Check if Authorization header exists and starts with "Bearer "
  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    // 2. Verify token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError("Invalid token"));
  }
  // 3. Attach user payload to request
  req.user = payload;

  // 4. Continue to the next middleware/route handler
  return next();
};

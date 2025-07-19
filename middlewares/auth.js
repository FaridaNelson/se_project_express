const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // 1. Check if Authorization header exists and starts with "Bearer "
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    // 2. Verify token
    const payload = jwt.verify(token, JWT_SECRET);

    // 3. Attach user payload to request
    req.user = payload;

    // 4. Continue to the next middleware/route handler
    return next();
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
};

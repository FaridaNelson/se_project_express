const { NOT_FOUND } = require("../utils/error-codes");

function notFoundHandler(req, res) {
  next(new Error("Requested resource not found"));
}

module.exports = notFoundHandler;

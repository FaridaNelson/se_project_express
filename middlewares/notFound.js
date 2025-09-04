const { NOT_FOUND } = require("../utils/error-codes");

function notFoundHandler(req, res) {
  return res
    .status(NOT_FOUND)
    .send({ message: "Requested resource not found" });
}

module.exports = notFoundHandler;

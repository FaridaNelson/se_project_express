function notFoundHandler(req, res) {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
}

module.exports = notFoundHandler;

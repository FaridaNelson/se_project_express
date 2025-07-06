// constants for HTTP status codes
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const CREATED = 201;
const OK = 200;

// 404 Not Found Middleware
function notFoundHandler(req, res) {
  res.status(404).send({ message: "Requested resource not found" });
}

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CREATED,
  OK,
  notFoundHandler,
};

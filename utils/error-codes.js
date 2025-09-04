// constants for HTTP status codes
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;
const CREATED = 201;
const OK = 200;

// 404 Not Found Middleware
const notFoundHandler = require("../middlewares/notFound");
const { NotFoundError } = require("../errors");

module.exports = {
  BAD_REQUEST,
  FORBIDDEN,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  CREATED,
  OK,
  notFoundHandler,
  NotFoundError,
};

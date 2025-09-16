const NotFoundError = require("../errors/NotFoundError");

module.exports = function notFound(req, res, next) {
  if (res.headersSent) return next();

  const msg = `Requested resource ${req.method} ${req.originalUrl} was not found`;
  return next(new NotFoundError(msg));
};

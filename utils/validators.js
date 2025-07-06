const validator = require("validator");

function isValidUrl(value) {
  return validator.isURL(value, {
    protocols: ["http", "https"],
    require_protocol: true,
  });
}

module.exports = {
  isValidUrl,
};

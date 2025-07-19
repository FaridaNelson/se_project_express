const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key"; // fallback for dev

module.exports = {
  JWT_SECRET,
};

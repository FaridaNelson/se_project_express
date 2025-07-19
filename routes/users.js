const router = require("express").Router();
const { notFoundHandler } = require("../utils/errors");
const { getCurrentUser } = require("../controllers/users");
const { updateProfile } = require("../controllers/users");

router.use("*", notFoundHandler); // Catch-all for undefined routes
router.get("/me", getCurrentUser);
// PATCH /users/me — update profile
router.patch("/me", updateProfile);

module.exports = router;

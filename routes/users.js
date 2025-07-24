const router = require("express").Router();
const { notFoundHandler } = require("../utils/errors");
const { getCurrentUser } = require("../controllers/users");
const { updateProfile } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateProfile); // PATCH /users/me — update profile
router.use("*", notFoundHandler); // Catch-all for undefined routes

module.exports = router;

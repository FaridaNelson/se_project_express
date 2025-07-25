const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const { updateProfile } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateProfile); // PATCH /users/me — update profile

module.exports = router;

const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const { updateProfile } = require("../controllers/users");
const { validateUpdateProfile } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateProfile, updateProfile); // PATCH /users/me — update profile

module.exports = router;

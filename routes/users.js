const router = require("express").Router();
const { getUsers, getUserById, createUser } = require("../controllers/users");
const { notFoundHandler } = require("../utils/errors");

router.get("/", getUsers);

router.get("/:userId", getUserById);

router.post("/", createUser);

router.use("*", notFoundHandler); // Catch-all for undefined routes

module.exports = router;

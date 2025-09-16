require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const { PORT = 3001 } = process.env;

const { errors } = require("celebrate");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes");
const notFound = require("./middlewares/notFound");
const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validation");

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use(cors());
app.use(express.json());

// Request loggging middleware
app.use(requestLogger);

// no authorization required for these routes
app.post("/signin", validateLogin, require("./controllers/users").login);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post(
  "/signup",
  validateCreateUser,
  require("./controllers/users").createUser
);

app.get("/items", require("./controllers/clothingItems").getClothingItems);

// Authorization middleware for protected routes
app.use(auth);

// Protected routes
app.use("/", mainRouter);

// Error handling middleware
app.use(notFound);

// Error loggging middleware
app.use(errorLogger);

// Celebrate error handler
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});

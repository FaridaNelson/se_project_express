const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const { PORT = 3001 } = process.env;

const auth = require("./middlewares/auth");
const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/clothingItems");
const mainRouter = require("./routes");
const { notFoundHandler } = require("./utils/errors");

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use(cors());
app.use(express.json());

// no authorization required for these routes
app.post("/signin", require("./controllers/users").login);

app.post("/signup", require("./controllers/users").createUser);

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // mock ID
  };
  next();
});

app.use("/items", itemsRouter);

// Authorization middleware for protected routes
app.use(auth);

// Protected routes
app.use("/users", usersRouter);
app.use("/", mainRouter);

// Error handling middleware
app.use(notFoundHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});

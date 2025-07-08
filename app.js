const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const mainRouter = require("./routes");
const { notFoundHandler } = require("./utils/errors");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

app.use("/", mainRouter);

// Error handling middleware
app.use(notFoundHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});

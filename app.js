const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const mainRouter = require("./routes/index");
const clothingItemRouter = require("./routes/clothingItems");
const { notFoundHandler } = require("./utils/errors");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use("/", mainRouter);
app.use("/items", clothingItemRouter);

// Error handling middleware
app.use(notFoundHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});

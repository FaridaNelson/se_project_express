const mongoose = require("mongoose");
const { isValidUrl } = require("../utils/validators");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "Avatar URL is required"],
    validate: {
      validator: isValidUrl,
      message: "You must enter a valid URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
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
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false, // Exclude password from query results by default
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);

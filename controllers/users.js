const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { JWT_SECRET } = require("../utils/config");

const { CREATED, OK } = require("../utils/error-codes");

const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
} = require("../errors");

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(OK).send({ data: users });
  } catch (err) {
    next(err);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) throw new UnauthorizedError("No user ID in request");

    const user = await User.findById(userId).orFail(
      () => new NotFoundError("User not found")
    );

    res.status(OK).send({ data: user });
  } catch (err) {
    if (err?.name === "CastError") {
      return next(new BadRequestError("Invalid user ID"));
    }
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, avatar, email, password: hash });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(CREATED).send({ data: userObj });
  } catch (err) {
    if (err?.code === 11000) {
      return next(new ConflictError("A user with this email already exists."));
    }
    if (err?.name === "ValidationError") {
      return next(new BadRequestError(err.message));
    }
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(OK).send({ token });
  } catch (err) {
    if (err?.message === "Incorrect email or password") {
      return next(new UnauthorizedError(err.message));
    }
    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) throw new UnauthorizedError("No user ID in request");

    const { name, avatar } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (avatar !== undefined) updateData.avatar = avatar;

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestError("No valid fields to update");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) throw new NotFoundError("User not found");

    res.status(OK).send({ data: updatedUser });
  } catch (err) {
    if (err?.name === "ValidationError") {
      return next(new BadRequestError(err.message));
    }
    if (err?.name === "CastError") {
      return next(new BadRequestError("Invalid user ID"));
    }
    next(err);
  }
};

const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItems");

const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  ConflictError,
} = require("../errors");

const { CREATED, OK } = require("../utils/error-codes");

module.exports.getClothingItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    res.status(OK).send({ data: items });
  } catch (err) {
    next(err);
  }
};

module.exports.createClothingItem = async (req, res, next) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user?._id;
    if (!owner) throw new UnauthorizedError("No user ID in request");

    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    res.status(CREATED).send({ data: item });
  } catch (err) {
    // Map common Mongoose errors to my custom ones:
    if (err?.name === "ValidationError") {
      return next(new BadRequestError(`Validation error: ${err.message}`));
    }
    if (err?.code === 11000) {
      return next(new ConflictError("Item with these fields already exists"));
    }
    next(err);
  }
};

module.exports.deleteClothingItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      throw new BadRequestError("Invalid item ID");
    }
    if (!req.user?._id) {
      throw new UnauthorizedError("No user ID in request");
    }

    const item = await ClothingItem.findById(itemId).orFail(
      () => new NotFoundError("Item not found")
    );

    // Ensure the owner field is compared correctly
    const itemOwnerId =
      typeof item.owner === "object" && item.owner !== null
        ? item.owner._id?.toString?.()
        : item.owner?.toString?.();

    if (itemOwnerId !== req.user._id.toString()) {
      throw new ForbiddenError("You are not authorized to delete this item");
    }

    await ClothingItem.findByIdAndDelete(itemId);
    res.status(OK).send({ data: item });
  } catch (err) {
    next(err);
  }
};

module.exports.likeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      throw new BadRequestError("Invalid item ID");
    }

    const item = await ClothingItem.findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    if (!item) throw new NotFoundError("Item not found");

    res.status(OK).send({ data: item });
  } catch (err) {
    // CastError (bad id in update path) → BadRequest
    if (err?.name === "CastError") {
      return next(new BadRequestError("Invalid item ID"));
    }
    next(err);
  }
};

module.exports.unlikeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      throw new BadRequestError("Invalid item ID");
    }

    const item = await ClothingItem.findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    if (!item) throw new NotFoundError("Item not found");

    res.status(OK).send({ data: item });
  } catch (err) {
    if (err?.name === "CastError") {
      return next(new BadRequestError("Invalid item ID"));
    }
    next(err);
  }
};

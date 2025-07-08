const mongoose = require("mongoose");

const ClothingItem = require("../models/clothingItems");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CREATED,
  OK,
} = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .populate(["owner"])
    .then((items) => res.status(OK).send({ data: items }))
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED).send({ data: item }))
    .catch((err) => {
      console.error(err.message);
      res
        .status(BAD_REQUEST)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
  }

  return ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => new Error("Item not found"))
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.message === "Item not found") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.likeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ message: "Invalid item ID" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res.send(item);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.unlikeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ message: "Invalid item ID" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } }, // remove user from likes array
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res.send(item);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

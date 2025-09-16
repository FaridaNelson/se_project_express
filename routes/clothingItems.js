const router = require("express").Router();
const {
  createClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const {
  validateCreateClothingItem,
  validateItemIdParam,
} = require("../middlewares/validation");

// POST /items — creates a new item
router.post("/", validateCreateClothingItem, createClothingItem);

// DELETE /items/:itemId — deletes an item by _id
router.delete("/:itemId", validateItemIdParam, deleteClothingItem);

// routes for the like and unlike functionality
router.put("/:itemId/likes", validateItemIdParam, likeItem);
router.delete("/:itemId/likes", validateItemIdParam, unlikeItem);

module.exports = router;

const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

// GET /items — returns all clothing items
router.get("/", getClothingItems);
// POST /items — creates a new item
router.post("/", createClothingItem);
// DELETE /items/:itemId — deletes an item by _id
router.delete("/:itemId", deleteClothingItem);

// routes for the like and unlike functionality
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;

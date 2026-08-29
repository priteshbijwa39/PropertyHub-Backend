const express = require("express");
const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const {
  toggleFavorite,
  getFavoriteProperties,
} = require("../controllers/favoriteController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
// after token varify user can create property route
router.post("/", authMiddleware, createProperty);
// for get property details
// get favrate property
router.get("/favorite", authMiddleware, getFavoriteProperties);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
// for update property
router.put("/:id", authMiddleware, updateProperty);
// for delete property
router.delete("/:id", authMiddleware, deleteProperty);
// for toggling favorite property
router.post("/favorite/:id", authMiddleware, toggleFavorite);

module.exports = router;

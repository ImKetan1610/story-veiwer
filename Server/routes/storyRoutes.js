const express = require("express");
const { protectedRoute } = require("../middleware/authMiddleware");
const {
  createStory,
  getAllStories,
  getStoryById,
  updateStory,
  deleteStory,
} = require("../controllers/storyController");
const router = express.Router();

// create new story (protected route)
router.post("/create", protectedRoute, createStory);

// get all story
router.get("/", getAllStories);

// get story by id
router.get("/:id", getStoryById);

// update the specific story (protected route)
router.put("/update/:id", protectedRoute, updateStory);

// delete the specific story (protected route)
router.delete("/delete/:id", protectedRoute, deleteStory);

module.exports = router;

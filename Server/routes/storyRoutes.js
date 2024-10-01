const express = require("express");
const router = express.Router();
const {
  addStory,
  editStory,
  getStories,
  getStoryById,
  likedStories,
} = require("../controllers/storyController.js");
const { protectedRoute } = require("../middleware/authMiddleware.js");

//routes
router.post("/add", protectedRoute, addStory);
router.put("/edit/:id", protectedRoute, editStory);
router.put("/like/:id", protectedRoute, likedStories);
router.get("/getAll", getStories);
router.get("/getById/:storyId", getStoryById);

module.exports = router;

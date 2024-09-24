const express = require("express");
const { protectedRoute } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  bookmarkStory,
  getBookmarks,
} = require("../controllers/userController");
const router = express.Router();

// User Registration
router.post("/register", registerUser);

// user login
router.post("/login", loginUser);

// bookmark a story (protected route)
router.post("/bookmark/:storyId", protectedRoute, bookmarkStory);

// get all bookmarked stories for the specific user (protected route)
router.get("/all-bookmark", protectedRoute, getBookmarks);

module.exports = router;

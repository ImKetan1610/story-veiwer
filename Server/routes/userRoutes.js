const express = require("express");
const router = express.Router();
const {
  testAPI,
  register,
  login,
  findUser,
  logout,
  bookmarkedStories,
  getAllBookmarks,
} = require("../controllers/userController.js");
const { protectedRoute } = require("../middleware/authMiddleware.js");

//user routes
router.get("/test", testAPI);
router.get("/find/:username", protectedRoute, findUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//bookmark route
router.put("/bookmark/:id", protectedRoute, bookmarkedStories);
router.get("/bookmarks/:userId", protectedRoute, getAllBookmarks);

module.exports = router;

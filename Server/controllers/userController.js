const User = require("../models/User");
const Story = require("../models/Story");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  test To check the health of api
const testAPI = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "API is working!" });
  } catch {
    next(new Error("Error API is not working!"));
  }
};

// register new user
const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(422).json("Please ensure all fields are filled");
    }
    //check if user already exist
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.status(409).json("Duplicate user found");
    }
    // to encrypt the password using bcryptjs
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    //jwt token generation
    const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        strict: true,
        secure: true,
      })
      .json({
        success: true,
        token,
        username: username,
        userId: user._id,
        user,
      });
  } catch (error) {
    next(new Error("User registration failed"));
  }
};

//login the existing user
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(422).json("Please ensure all fields are filled");
    }
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json("User Not Found");
    } else {
      // decrypt the password using bcryptjs
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json("Invalid login information");
      }
      //jwt token generation
      const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
        })
        .json({
          success: true,
          token,
          username: username,
          userId: user._id,
          user,
        });
    }
  } catch (error) {
    next(new Error("User login failed"));
  }
};

// find already registered user
const findUser = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (user) {
      res
        .status(200)
        .json({ success: true, username: username, userId: user._id, user });
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    next(new Error("Failed to retrieve user"));
  }
};

// logout user
const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "User successfully logged out" });
  } catch (error) {
    next(new Error("User logout failed"));
  }
};


const bookmarkedStories = async (req, res) => {
  try {
    let storyId = req.params.id;
    const { userId } = req.body;

    const story = await Story.findById(storyId);
    const user = await User.findById(userId);

    if (!story) {
      return res.status(404).json({ message: "Story not found " });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //Checking previous bookmarks
    if (user.bookmarks.includes(storyId)) {
      return res
        .status(409)
        .json({ message: "Story already bookmarked", bookmarked: true });
    }
    //push storyId into user bookmarks array
    user.bookmarks.push(storyId);
    await user.save();

    //push userId into story bookmarks array
    story.bookmarks.push(userId);
    await story.save();

    res.status(200).json({
      message: "Story bookmarked and saved",
      bookmarked: true,
      bookmarks: user.bookmarks,
      story,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Oops, something went wrong", error: error.message });
  }
};

//getting all bookmarks
const getAllBookmarks = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //fetch all story bookmarked by logged-in user
    const bookmarks = await Story.find({
      _id: { $in: user.bookmarks },
    }).sort({ createdAt: -1 });
    res.status(200).json({ bookmarks: bookmarks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookmarks", error: error.message });
  }
};

module.exports = {
  testAPI,
  register,
  login,
  findUser,
  logout,
  bookmarkedStories,
  getAllBookmarks
};

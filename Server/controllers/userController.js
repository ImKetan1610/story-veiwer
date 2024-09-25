const { validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// logic to generate token
const generateToken = async (id) => {
  let token = await jwt.sign({ id }, process.env.SECRETE_PASSKEY, {
    expiresIn: "1h",
  });
  return token;
};

// register the user
const registerUser = async (req, res) => {
  let { username, password } = req.body;

  // validate input
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  // check whether the user is present in the database with the same username or not
  const existedUser = await User.findOne({ username });
  if (existedUser) {
    return res.status(400).json({
      message: "User is already exist in the database with this username",
    });
  }

  try {
    // create the new user
    let newUser = await User.create({ username, password });

    // generate the token using logic already written in the generateToken function
    let token = await generateToken(newUser._id);

    return res.status(201).json({ newUser, token });
  } catch (error) {
    //  handle error
    return res.status(500).send({ message: "internal server error" });
  }
};

// login the user
const loginUser = async (req, res) => {
  // destructure the request object
  const { username, password } = req.body;

  // check whether the username is present in the db or not
  let user = await User.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Please check the username or password." });
  }

  // check the input password is matching with the hashed password stored in the database
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Please check the username or password." });
  }

  // generate the token
  let token = await generateToken(user._id);
  return res.status(200).json({ user, token });
};

// add stories to the bookmark
const bookmarkStory = async (req, res) => {
  const storyId = req.params.storyId;
  try {
    const user = await User.findById(req.user._id);

    // check if the story is bookmarked or not
    const isBookmarked = user.bookmarks.includes(storyId);

    if(isBookmarked){
      //  as this is added to the bookmarks then we need to remove it from the db
      user.bookmarks = user.bookmarks.filter((id)=> id.toString()!==storyId.toString)
      await user.save()
      return res.status(200).json({message: "Story is removed from the bookmarks."})
    } else {
      // need to add the story to the db
      user.bookmarks.push(storyId);
      await user.save();
      return res.status(200).json({message: "Story is bookmarked successfully."})
    }
  } catch (error) {
    return res.status(500).json({message: "Internal Server Error."})
  }
};

// get all the bookmarked stories
const getBookmarks = async (req, res) => {
  let id = req.user._id;
  try {
    const user = await User.findById(id).populate('bookmarks');
    res.status(200).json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookmarks', error });
  }
};

module.exports = { registerUser, loginUser, bookmarkStory, getBookmarks };

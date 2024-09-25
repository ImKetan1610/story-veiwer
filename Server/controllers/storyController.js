const Story = require("../models/Story");

// create the story
const createStory = async (req, res) => {
  const { title, slides, category } = req.body;
  if (slides.length >= 3 && slides.length <= 6) {
    return res
      .status(400)
      .json({ message: "Story must have between 3 and 6 slides." });
  }

  try {
    const newStory = await Story.create({
      title,
      slides,
      category,
      createdBy: req.user._id,
    });
    return res.status(201).send(newStory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while creating a story", error });
  }
};

// get all the story
const getAllStories = async (req, res) => {
  try {
    const allStories = await Story.find();
    return res.status(200).json(allStories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching the stories", error });
  }
};

// get story by id
const getStoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found." });
    }
    return res.status(200).json(story);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching a story", error });
  }
};

// get stories by category
const getStoriesByCategory = async (req, res) => {
  // extracting the category from params
  const category = req.params.category;
  try {
    // finding the stories from the database on the basis of the category
    const stories = await Story.find({ category });

    if (!stories || stories.length === 0) {
      return res.status(404).json({ message: "Stories are not found." });
    }

    return res.status(200).json(stories);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// like the story
const likeStory = async (req, res) => {
  let id = req.params.id;
  try {
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).send({ message: "Story not found", error });
    }

    await story.toggleLike(req.user._id);

    return res
      .status(200)
      .json({ message: "Like status updated", likes: story.likes.length });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error", error });
  }
};

// update the story
const updateStory = async (req, res) => {
  const { title, slides, category } = req.body;
  const id = req.params.id;
  try {
    let story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ message: "Story is not found" });
    }

    if (story.createdAt.toString() != req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update the story." });
    }

    // update the fields
    story.title = title || story.title;
    story.slides =
      slides.length >= 3 && slides.length <= 6 ? slides : story.slides;
    story.category = category || story.category;

    // save the story
    await story.save();

    return res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

// delete the story (only by the creator of the story)
const deleteStory = async (req, res) => {
  const id = req.params.id;
  try {
    let story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ message: "Story is not found." });
    }

    if (story.createdBy.toString() != req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "user is not authorized to perform this action" });
    }

    await story.remove();
    return res.status(200).json({ message: "Story deleted successfully." });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};

module.exports = {
  createStory,
  getAllStories,
  getStoryById,
  getStoriesByCategory,
  likeStory,
  updateStory,
  deleteStory,
};

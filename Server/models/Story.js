const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slides: [
      {
        type: String,
        required: [true, "Slide content (image/video URL) is required."],
      },
    ],
    category: {
      type: String,
      enum: ["food", "health and fitness", "travel", "movie", "education"],
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Method to add/remove a like
storySchema.methods.toggleLike = function (userId) {
  if (this.likes.includes(userId)) {
    // Unlike the story
    this.likes.pull(userId);
  } else {
    // Like the story
    this.likes.push(userId);
  }
  return this.save();
};

const Story = mongoose.model("Story", storySchema);
module.exports = Story;

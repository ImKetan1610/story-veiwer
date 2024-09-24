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

const Story = mongoose.model('Story', storySchema);
module.exports = Story;

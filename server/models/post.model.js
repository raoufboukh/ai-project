import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    creator: String,
    image: String,
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);

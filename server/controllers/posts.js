import cloudinary from "../lib/cloudinary.js";
import { Post } from "../models/post.model.js";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateImage = async (req, res) => {
  try {
    const { message } = req.body;
    const gptResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: message,
      n: 1,
      size: "1024x1024",
    });
    res
      .status(200)
      .json({
        message: "Image generated successfully",
        data: gptResponse.data.choices[0].text,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, message, creator, image } = req.body;
    const photo = cloudinary.uploader.upload(image);
    const newPost = new Post({ title, message, creator, image: photo.url });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

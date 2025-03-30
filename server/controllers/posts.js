import cloudinary from "../lib/cloudinary.js";
import { Post } from "../models/post.model.js";
import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";

dotenv.config();
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
export const generateImage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const response = await openai.createImage({
      prompt: message,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    // Correction: La structure correcte pour accéder à l'image encodée en base64
    const imageUrl = response.data.data[0].b64_json;
    res.status(201).json({ imageUrl });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error generating image",
      error: error.response?.data?.error?.message || error.message,
    });
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

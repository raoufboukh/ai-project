import express from "express";
import { createPost, generateImage, getPosts } from "../controllers/posts.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.post("/generate-image", generateImage);

export default router;

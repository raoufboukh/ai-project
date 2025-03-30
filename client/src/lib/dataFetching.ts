/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./axios";

export const getPosts = async () => {
  const { data } = await axiosInstance.get("/posts");
  return data;
};

export const createPost = async (info: any) => {
  try {
    const { data } = await axiosInstance.post("/posts", info);
    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to create post");
    }
    throw error;
  }
};

export const generateImage = async (message: string) => {
  try {
    const { data } = await axiosInstance.post("/posts/generate-image", {
      message,
    });
    return data.data;
  } catch (error: any) {
    console.error("Error generating image:", error);
    if (error.response?.data?.billingError) {
      throw new Error(
        error.response.data.message || "OpenAI billing limit reached"
      );
    }
    throw new Error(
      error.response?.data?.message || "Failed to generate image"
    );
  }
};

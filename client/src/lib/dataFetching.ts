/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./axios";

export const getPosts = async () => {
  const { data } = await axiosInstance.get("/posts");
  return data;
};

export const createPost = async (info: any) => {
  const { data } = await axiosInstance.post("/posts", info);
  return data;
};

export const generateImage = async (info: any) => {
  const { data } = await axiosInstance.post("/generate-image", info);
  return data;
};

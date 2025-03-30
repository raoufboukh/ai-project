/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost, generateImage } from "@/lib/dataFetching";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props {
  image: string;
  setImage: (image: string) => void;
}

const Form: React.FC<Props> = ({ image, setImage }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generateMutation = useMutation({
    mutationKey: ["generateImage"],
    mutationFn: async () => {
      if (formData.message.length < 10) {
        throw new Error("Message should be at least 10 characters long");
      }
      setIsGenerating(true);
      try {
        const imageUrl = await generateImage(formData.message);
        setImage(imageUrl);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
        return imageUrl;
      } finally {
        setIsGenerating(false);
      }
    },
    onError: (error: any) => {
      setError(error.message || "Failed to generate image");
    },
  });

  const postMutation = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async () => {
      if (
        !formData.title ||
        !formData.author ||
        formData.message.length < 10 ||
        !formData.image
      ) {
        throw new Error("Please fill all fields and generate an image");
      }
      return createPost(formData);
    },
    onError: (error: any) => {
      setError(error.message || "Failed to create post");
    },
  });

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    message: "",
    image: image,
  });
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (
      formData.title &&
      formData.author &&
      formData.message.length > 10 &&
      formData.image
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [formData]);

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold">
        Generate image with your imagination
      </h1>
      <p className="text-gray-500 text-lg">
        Write your prompt according to the image you want to generate
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
        />
      </div>
      <div>
        <label htmlFor="auth">Author</label>
        <input
          type="text"
          id="auth"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder="Author"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
        />
      </div>
      <div>
        <label htmlFor="mess">Message Prompt</label>
        <textarea
          id="mess"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Write your Imagination!"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none min-h-[100px]"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          className="bg-primary py-2 px-5 rounded-md disabled:opacity-50"
          disabled={formData.message.length < 10 || isGenerating}
          onClick={() => generateMutation.mutate()}
          type="button"
        >
          {isGenerating ? "Generating..." : "Generate"}
        </button>
        <button
          className="bg-primary py-2 px-5 rounded-md disabled:opacity-50"
          disabled={!show || postMutation.isPending}
          onClick={() => postMutation.mutate()}
          type="button"
        >
          {postMutation.isPending ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default Form;

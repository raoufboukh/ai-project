/* eslint-disable @typescript-eslint/no-explicit-any */
import { TbCircleDot } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/dataFetching";

interface Props {
  setPosts: (posts: any[]) => void;
}

const Description: React.FC<Props> = ({ setPosts }) => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
  if (data) {
    setPosts(data);
  }
  const handleSearch = (search: string) => {
    const filtredPosts = data.filter((post: any) => {
      return (
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.message.toLowerCase().includes(search.toLowerCase())
      );
    });
    setPosts(filtredPosts);
  };
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl font-bold text-center">
        Explore popular posts in the commnity!
      </h2>
      <p className="text-purple-600 text-2xl flex justify-center items-center gap-2">
        <TbCircleDot />
        <span className="font-bold">Generated With AI</span>
        <TbCircleDot />
      </p>
      <div className="relative mx-auto w-64">
        <FaSearch className="absolute top-3 cursor-pointer left-3 text-white" />
        <input
          type="text"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          placeholder="Search posts..."
          className="text-white border rounded-lg py-2 px-10 w-full outline-none"
        />
      </div>
    </div>
  );
};

export default Description;

/* eslint-disable @typescript-eslint/no-explicit-any */
import Description from "@/components/Description";
import Posts from "@/components/Posts";
import { useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  return (
    <section className="bg-secondary text-white py-10 min-h-screen">
      <div className="container">
        <Description setPosts={setPosts} />
        <Posts posts={posts} />
      </div>
    </section>
  );
};

export default Home;

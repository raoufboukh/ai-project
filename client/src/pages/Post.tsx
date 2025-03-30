import Form from "@/components/Post/Form";
import Image from "@/components/Post/Image";
import { useState } from "react";

const Post = () => {
  const [image, setImage] = useState("");
  return (
    <section className="py-20">
      <div className="container">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
          <Form image={image} setImage={setImage} />
          <Image image={image} />
        </div>
      </div>
    </section>
  );
};

export default Post;

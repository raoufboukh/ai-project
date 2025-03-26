/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  posts: any[];
}

const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts?.map((post: any, i: number) => (
        <div key={i}>
          <h2>{post.title}</h2>
          <img src={post.image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Posts;

import { Link } from "react-router-dom";

const Button = () => {
  return (
    <Link
      to="/post"
      className="text-xs sm:text-sm font-bold rounded-xl bg-blue-500 py-2 px-4"
    >
      + Create New Post
    </Link>
  );
};

export default Button;

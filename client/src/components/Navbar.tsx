import { Link } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  return (
    <header className="bg-primary py-2">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold">
          GenAI
        </Link>
        <Button />
      </div>
    </header>
  );
};

export default Navbar;

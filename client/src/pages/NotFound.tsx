import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError() as { message?: string };
  return (
    <div className="container flex flex-col gap-5 justify-center items-center h-screen bg-black text-white">
      <h1 className="text-3xl">Oops! Page not found</h1>
      <p className="text-xl">
        {error?.message || "An unknown error occurred."}
      </p>
    </div>
  );
};

export default NotFound;

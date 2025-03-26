import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Layout = () => {
  const location = useLocation();
  const validPaths = ["/", "/post"];
  const isValidPath = validPaths.includes(location.pathname);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {isValidPath && <Navbar />}
      <Outlet />
    </QueryClientProvider>
  );
};

export default Layout;

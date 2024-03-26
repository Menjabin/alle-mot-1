import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./routes/main";
import Admin from "./routes/admin";
import Contestant from "./routes/contestant";
import Results from "./routes/results";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/contestant",
    element: <Contestant />,
  },
  {
    path: "/results",
    element: <Results />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

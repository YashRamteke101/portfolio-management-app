import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import  { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/portfolio", element: <Portfolio /> },
    ],
  },
]);

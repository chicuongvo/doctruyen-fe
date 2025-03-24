import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import StoryOverview from "./pages/StoryOverview";
import Story from "./pages/Story";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Genres from "./pages/Genres";
import AppLayout from "./components/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "genres/:genre", element: <Genres /> },
      { path: "/search", element: <Search /> },
      { path: "/story/:id", element: <StoryOverview /> },
      { path: "/story/:id/:chapter", element: <Story /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/blog/:id", element: <Blog /> },
      { path: "/admin", element: <Admin /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

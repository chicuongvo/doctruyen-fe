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
import AppLayout from "./components/AppLayout";
import { UserProvider } from "./contexts/userContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;

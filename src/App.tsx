import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import Search from "./pages/Search";
import StoryOverview from "./pages/StoryOverview";
import Story from "./pages/Story";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Admin from "./pages/admin/Admin";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Genres from "./pages/Genres";
import GetVerifyToken from "./pages/GetVerifyToken";
import VerifyAccount from "./pages/VerifyAccount";
import ResetPasswordToken from "./pages/ResetPasswordToken";
import ResetPassword from "./pages/ResetPassword";
import AppLayout from "./components/AppLayout";
import { UserProvider } from "./contexts/userContext";
import Profile from "./pages/Profile";
import Chatbot from "./pages/Chatbot";

import UserList from "./pages/admin/users/UserList";
import UserDetail from "./pages/admin/users/UserDetail";
import StoryList from "./pages/admin/stories/StoryList";
import StoryDetail from "./pages/admin/stories/StoryDetail";
import StoryEdit from "./pages/admin/stories/StoryEdit";
import StoryNew from "./pages/admin/stories/StoryNew";
import ChapterDetail from "./pages/admin/stories/chapters/ChapterDetail";
import ChapterEdit from "./pages/admin/stories/chapters/ChapterEdit";
import ChapterNew from "./pages/admin/stories/chapters/ChapterNew";
import BlogList from "./pages/admin/blogs/BlogList";
import BlogDetail from "./pages/admin/blogs/BlogDetail";
import BlogEdit from "./pages/admin/blogs/BlogEdit";
import BlogNew from "./pages/admin/blogs/BlogNew";

const queryClient = new QueryClient();

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
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/get-verify-token", element: <GetVerifyToken /> },
      { path: "/verify-account", element: <VerifyAccount /> },
      { path: "/get-reset-password-token", element: <ResetPasswordToken /> },
      {
        path: "/reset-password/:reset_password_token",
        element: <ResetPassword />,
      },
      { path: "/profile", element: <Profile /> },
      { path: "/chatbot", element: <Chatbot /> },
      { path: "stories", element: <Genres /> },
      { path: "/search", element: <Search /> },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          { path: "/admin/users", element: <UserList /> },
          {
            path: "/admin/users/:userId",
            element: <UserDetail />,
          },
          { path: "/admin/stories", element: <StoryList /> },
          { path: "/admin/stories/:storyId/edit", element: <StoryEdit /> },
          { path: "/admin/stories/:storyId", element: <StoryDetail /> },
          { path: "/admin/stories/new", element: <StoryNew /> },
          {
            path: "/admin/stories/:storyId/chapters/:chapterId",
            element: <ChapterDetail />,
          },
          {
            path: "/admin/stories/:storyId/chapters/:chapterId/edit",
            element: <ChapterEdit />,
          },
          {
            path: "/admin/stories/:storyId/chapters/new",
            element: <ChapterNew />,
          },
          {
            path: "/admin/blogs",
            element: <BlogList />,
          },
          {
            path: "/admin/blogs/:blogId",
            element: <BlogDetail />,
          },
          {
            path: "/admin/blogs/:blogId/edit",
            element: <BlogEdit />,
          },
          {
            path: "/admin/blogs/new",
            element: <BlogNew />,
          },
        ],
      },
    ],
  },
  { path: "/story/:id", element: <StoryOverview /> },
  { path: "/story/:id/:chapter", element: <Story /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/blog/:id", element: <Blog /> },
  { path: "/admin", element: <Admin /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;

import { useUser } from "@/contexts/userContext";
import { Link, Outlet } from "react-router-dom";

function Admin() {
  const { userProfile } = useUser();

  if (userProfile?.role !== "ADMIN") return null;
  return (
    <div className="p-8 dark:bg-white bg-black text-white dark:text-black">
      <h1 className="text-center font-extrabold text-3xl">Admin Dashboard</h1>
      <ul className="flex gap-4">
        <li>
          <Link to="stories">Stories</Link>
        </li>
        <li>
          <Link to="blogs">Blogs</Link>
        </li>
        <li>
          <Link to="users">Users</Link>
        </li>
      </ul>
      <div className="max-w-7xl m-auto p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;

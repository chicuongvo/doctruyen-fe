import { useUser } from "@/contexts/userContext";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Admin() {
  const { userProfile } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile?.role !== "ADMIN") navigate("/");
  });
  if (userProfile?.role !== "ADMIN") return null;
  return (
    <div className="p-8">
      <h1 className="text-center font-extrabold text-2xl">Admin Dashboard</h1>
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

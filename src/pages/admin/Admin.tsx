import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="p-8">
      <h1 className="text-center font-extrabold text-2xl">Admin Dashboard</h1>
      <div className="max-w-7xl m-auto p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;

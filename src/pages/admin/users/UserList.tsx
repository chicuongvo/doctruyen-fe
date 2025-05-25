import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../api/users.api";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Spinner from "../../../components/Spinner";

interface User {
  user_id: string;
  google_id: string | null;
  username: string;
  email: string;
  phone_number: string;
  role: string;
  fullname: string;
  profile_pic: string;
  created_at: string;
  is_verified: boolean;
  is_banned: boolean;
}

function UserList() {
  const { isLoading, data } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  const users: User[] = data?.data?.data;
  console.log(data?.data);

  if (isLoading || !users) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.user_id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.profile_pic}
                        alt={user.username}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {user.fullname}
                      </div>
                      <div className="text-sm text-gray-500">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{user.email}</div>
                  <div className="text-sm text-gray-500">
                    {user.phone_number}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-start gap-1">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800 "}`}
                    >
                      {user.is_verified ? "Verified" : "Unverified"}
                    </span>
                    {user.is_banned && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Banned
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm flex gap-1  text-gray-800 cursor-pointer">
                  <Link to={`/admin/users/${user.user_id}`}>
                    <Button>Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;

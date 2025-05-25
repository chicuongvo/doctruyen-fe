import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { getUserById, updateUser } from "../../../api/users.api";

function UserDetail() {
  const { register, handleSubmit } = useForm();
  const { userId } = useParams();
  const { mutate } = useMutation({
    mutationFn: updateUser,
  });
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(userId ?? ""),
  });
  const onSubmit = (data: any) => {
    console.log(data);
    const newUser = {
      fullname: data.fullname,
      email: data.email,
      phone_number: data.phone_number,
    };
    mutate(newUser);
  };

  const user = data?.data.data;
  const [editing, setEditing] = useState(true);

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    setEditing(false);
  };
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-dark rounded-lg shadow mt-8">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user.profile_pic}
          alt={user.username}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.fullname}</h2>
          <p>@{user.username}</p>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 font-semibold">
              {user.role}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded font-semibold ${user.is_verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
            >
              {user.is_verified ? "Verified" : "Unverified"}
            </span>
            {user.is_banned && (
              <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800 font-semibold">
                Banned
              </span>
            )}
          </div>
        </div>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={user.fullname}
            disabled={!editing}
            {...register("fullname")}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 px-3 py-2 "
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={user.username}
            disabled={!editing}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            value={user.email}
            disabled={true}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            {...register("phone_number")}
            value={user.phone_number}
            disabled={!editing}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            {...register("role")}
            value={user.role}
            disabled={!editing}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 px-3 py-2"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              {...register("is_verified")}
              checked={user.is_verified}
              disabled={!editing}
              className="mr-2"
            />
            Verified
          </label>
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              {...register("is_banned")}
              checked={user.is_banned}
              disabled={!editing}
              className="mr-2"
            />
            Banned
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Created At
          </label>
          <input
            type="text"
            value={new Date(user.created_at).toLocaleString()}
            disabled
            className="mt-1 block w-full rounded border-gray-200 bg-gray-100"
          />
        </div>
        <div className="flex gap-3 justify-end pt-4">
          {editing ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-semibold"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserDetail;

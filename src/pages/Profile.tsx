import { useState, useEffect } from "react";
import { useUser } from "../contexts/userContext";
import { notification } from "antd";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [fullname, setFullname] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const { userProfile, setUserChanged } = useUser();

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || "");
      setEmail(userProfile.email || "");
      setPhoneNumber(userProfile.phone_number || "");
      setFullname(userProfile.fullname || "");
      setProfilePic(userProfile.profile_pic || "");
    }
  }, [userProfile]);

  const handleCancel = () => {
    setUsername(userProfile?.username || "");
    setEmail(userProfile?.email || "");
    setPhoneNumber(userProfile?.phone_number || "");
    setProfilePic(userProfile?.profile_pic || "");
    setFullname(userProfile?.fullname || "");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfilePic(reader.result);
      } else {
        console.error("Unexpected result type:", reader.result);
      }
    };

    reader.onerror = () => {
      console.error("Error reading file");
    };
  };

  const [api, contextHolder] = notification.useNotification();
  const API_URL = "https://doctruyen-be-e0t7.onrender.com/api";
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdate = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          phone_number,
          fullname,
          profile_pic,
        }),
      });

      const data = await response.json();

      if (data.success) {
        api.success({
          message: "UPDATE USER",
          description: "Update user successfully!",
        });
        setUserChanged(true);
      } else {
        api.error({
          message: "UPDATE USER",
          description: data.message,
        });
      }
    } catch (error) {
      console.log("Error updating user:", error);
      console.log(profile_pic);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-black font-spartan px-5 py-5 lg:px-60 ">
      {contextHolder}

      <div className="bg-zinc-800 px-3 py-15 rounded-[25px] border-zinc-600 border flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2">
        <div className="text-white flex flex-col justify-center items-center gap-3 border-b border-zinc-700 py-3">
          <div className="font-bold text-3xl ">Account Details</div>
          <div className="text-lg text-center font-light text-[#e5e7eb]">
            Here you can make changes to your account
          </div>
          <div className="w-full flex  flex-col items-center justify-center">
            <img
              src={profile_pic}
              className=" w-[120px] h-[120px] md:h-[180px] md:w-[180px] object-cover rounded-full"
            />
            <form>
              <input
                type="file"
                id="fileInput"
                name="fileInput"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="fileInput"
                className="mt-3 w-[140px] h-[54px] flex items-center justify-center font-spartan text-[18px] text-primary border border-primary rounded-[15px] cursor-pointer bg-zinc-800 hover:bg-zinc-700 transition-all duration-500"
              >
                Upload Avatar
              </label>
            </form>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <form className="flex flex-col w-full gap-5">
            <div className="flex flex-col text-white text-[18px] gap-2">
              <label htmlFor="fullname" className="font-semibold">
                Fullname
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter your fullname"
                value={fullname}
                required
                className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px]"
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-white text-[18px] gap-2">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={username}
                required
                className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px]"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-white text-[18px] gap-2">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                required
                className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px]"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-white text-[18px] gap-2">
              <label htmlFor="phone" className="font-semibold">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={phone_number}
                required
                className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px]"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="w-full items-center flex justify-center pt-5 gap-5">
              <button
                className="w-[140px] h-[54px] font-spartan text-[18px] text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-violet-600 via-primary to-secondary rounded-[15px] cursor-pointer "
                onClick={handleUpdate}
                type="button"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : "Save changes"}
              </button>

              <button
                className="w-[140px] h-[54px] font-spartan text-[18px] text-primary border-[1px] border-primary  rounded-[15px] cursor-pointer  hover:bg-zinc-700 transition-all duration-500"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

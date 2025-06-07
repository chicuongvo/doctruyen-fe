import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { signOut } from "@/api/users.api";
import ThemeToggle from "./ThemeToggle";

interface Option {
  name: string;
  path: string;
}

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userProfile, setUserChanged } = useUser();

  const handleOnClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const options = [
    { name: "Trang chủ", path: "/" },
    { name: "Truyện", path: "/stories" },
    { name: "Blogs", path: "/blogs" },
    { name: "Tìm kiếm", path: "/search" },
    { name: "Yêu thích", path: "/liked-stories" },
  ];

  if (userProfile?.role === "ADMIN")
    options.push({ name: "Admin", path: "/admin" });

  const renderOptions = (options: Option[]) => {
    return options.map((option) => (
      <NavLink
        to={option.path}
        className="hover:text-primary transition-all duration-300 whitespace-nowrap"
        key={option.path}
      >
        {option.name}
      </NavLink>
    ));
  };

  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      const response = await signOut();

      const data = response.data;

      if (data.success) {
        setUserChanged(true);
        navigate("/");
        console.log("Success!");
      }
    } catch (error) {
      console.log("Error sign out:", error);
    }
  };

  return (
    <div className="font-spartan sticky top-0 z-50 ">
      <div className="w-full bg-zinc-800 border-b border-zinc-700 dark:border-zinc-300 h-[60px] md:h-[64px] flex items-center p-5 justify-between text-[20px] shadow-xl z-20 dark:bg-zinc-100 dark:text-black">
        <Logo />
        <div className="md:flex md:flex-row md:gap-10 text-[#e5e7e3] hidden text-[18px] font-semibold dark:text-black">
          {renderOptions(options)}
        </div>

        {userProfile ? (
          <div className="md:flex-row text-white md:flex md:gap-3 items-center justify-center">
            <div className="hidden md:block">
              <ThemeToggle />{" "}
            </div>
            <NavLink to="/profile">
              <img
                src={userProfile.profile_pic}
                alt="avatar"
                className="w-[40px] h-[40px] rounded-full hidden md:block object-cover"
              />
            </NavLink>
            <LogOut
              className="hover:text-primary transition-all duration-500 cursor-pointer hidden md:block dark:text-black dark:hover:text-primary"
              onClick={handleSignOut}
            />
          </div>
        ) : (
          <div className="flex flex-row gap-3 items-center justify-center">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <NavLink to="/signup">
              <button className="w-[124px] h-[50px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-primary to-secondary rounded-[15px] cursor-pointer hidden md:block">
                Đăng ký
              </button>
            </NavLink>
          </div>
        )}

        {/* Mobile-sidebar */}

        {isSidebarOpen ? (
          <X
            className="text-white w-9 h-10 stroke-1 md:hidden dark:text-black"
            onClick={handleOnClick}
          />
        ) : (
          <div className="md:hidden flex flex-row gap-2 ">
            <ThemeToggle />
            <NavLink to="/profile">
              <img
                src={userProfile?.profile_pic}
                alt="avatar"
                className={`w-[40px] h-[40px] rounded-full object-cover ${userProfile ? "block" : "hidden"}`}
              />
            </NavLink>
            <Menu
              className="text-white w-9 h-10 stroke-1 dark:text-black"
              onClick={handleOnClick}
            />
          </div>
        )}
      </div>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
}

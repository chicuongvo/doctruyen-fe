import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

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
    { name: "Home", path: "/" },
    { name: "Stories", path: "/story" },
    { name: "Blogs", path: "/blogs" },
    { name: "Search", path: "/search" },
  ];

  const renderOptions = (options: Option[]) => {
    return options.map((option) => (
      <Link
        to={option.path}
        className="hover:text-primary transition-all duration-300 "
        key={option.path}
      >
        {option.name}
      </Link>
    ));
  };

  const API_URL = "https://doctruyen-be-e0t7.onrender.com/api";
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/sign-out`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setUserChanged(true);
        navigate("/");
      }
    } catch (error) {
      console.log("Error sign out:", error);
    }
  };

  return (
    <div className="font-spartan sticky top-0 z-50">
      <div className="w-full bg-zinc-800 border-b border-zinc-700 h-[60px] md:h-[64px] flex items-center p-5 justify-between text-[20px] shadow-xl z-20">
        <Logo />
        <div className="md:flex md:flex-row md:gap-10 text-[#e5e7e3] hidden text-[18px] font-semibold md:block">
          {renderOptions(options)}
        </div>

        {userProfile ? (
          <div className="md:flex-row text-white md:flex md:gap-3 items-center justify-center">
            <Link to="/profile">
              <img
                src={userProfile.profile_pic}
                alt="avatar"
                className="w-[40px] h-[40px] rounded-full hidden md:block object-cover"
              />
            </Link>
            <LogOut
              className="hover:text-primary transition-all duration-500 cursor-pointer hidden md:block"
              onClick={handleSignOut}
            />
          </div>
        ) : (
          <Link to="/signup">
            <button className="w-[124px] h-[50px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-violet-600 via-primary to-secondary rounded-[15px] cursor-pointer hidden md:block">
              Sign Up
            </button>
          </Link>
        )}

        {/* Mobile-sidebar */}

        {isSidebarOpen ? (
          <X
            className="text-white w-9 h-10 stroke-1 md:hidden "
            onClick={handleOnClick}
          />
        ) : (
          <div className="md:hidden flex flex-row gap-2">
            <Link to="/profile">
              <img
                src={userProfile?.profile_pic}
                alt="avatar"
                className={`w-[40px] h-[40px] rounded-full object-cover ${userProfile ? "block" : "hidden"}`}
              />
            </Link>
            <Menu
              className="text-white w-9 h-10 stroke-1 "
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

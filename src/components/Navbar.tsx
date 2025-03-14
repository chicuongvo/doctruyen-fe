import { Menu, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Button from "./Button";
import { Link } from "react-router-dom";
import Logo from "./Logo";

interface Option {
  name: string;
  path: string;
}

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        className="hover:text-primary transition-all duration-300"
      >
        {option.name}
      </Link>
    ));
  };
  return (
    <div className="font-spartan">
      <div className="w-screen bg-zinc-800 border-b border-zinc-700 h-[60px] md:h-[64px] flex items-center p-5 justify-between text-[20px] shadow-xl sticky top-0 z-20">
        <Logo />
        <div className="md:w-max md:flex md:flex-row md:gap-10 text-[#e5e7e3] hidden text-[18px] font-semibold relative">
          {renderOptions(options)}
        </div>

        <Button
          text="Sign Up"
          width="w-[124px]"
          height="h-[50px]"
          decoration="hidden md:block"
        />

        {/* Mobile-sidebar */}
        {isSidebarOpen ? (
          <X
            className="text-white w-9 h-10 stroke-1 md:hidden "
            onClick={handleOnClick}
          />
        ) : (
          <Menu
            className="text-white w-9 h-10 stroke-1 md:hidden"
            onClick={handleOnClick}
          />
        )}
      </div>

      <Sidebar isSidebarOpen={isSidebarOpen} />
    </div>
  );
}

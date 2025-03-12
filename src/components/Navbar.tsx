import { Menu, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Button from "./Button";

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
    return options.map((option) => <div>{option.name}</div>);
  };
  return (
    <div className="font-spartan">
      <div className="w-screen bg-dark h-[60px] flex items-center p-5 justify-between text-[20px] shadow-xl sticky top-0 z-20">
        <div className="flex items-center justify-center ">
          <svg
            className="!text-gray-950 dark:!text-white"
            width="40"
            height="40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.176 24.381V14.043C15.176 8.496 10.679 4 5.133 4v10.34c0 5.547 4.496 10.041 10.043 10.041Zm2.292 4.753v-7.142a9.016 9.016 0 0 1 9.015-9.016v7.142a9.016 9.016 0 0 1-9.015 9.016ZM21.665 4.98a3.409 3.409 0 1 1-1.578 6.633 3.409 3.409 0 0 1 1.578-6.633Z"
              fill="#8019F8"
            ></path>
          </svg>
          <div className="text-white text-[20px] md:hidden lg:block">
            FictionMe
          </div>
        </div>
        <div className="md:w-max md:flex md:flex-row md:gap-10 text-white hidden text-[18px] font-semibold relative">
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

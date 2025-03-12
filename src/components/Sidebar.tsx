// import { Link } from "react-router-dom";
import Button from "./Button";

interface Option {
  name: string;
  path: string;
}
export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const options = [
    { name: "Home", path: "/" },
    { name: "Stories", path: "/story" },
    { name: "Blogs", path: "/blogs" },
    { name: "Search", path: "/search" },
  ];

  const renderOptions = (options: Option[]) => {
    return options.map((option) => (
      <div
        key={option.path}
        className="text-white h-[54px] w-full text-[16px] font-semibold font-spartan flex relative "
      >
        {option.name}
      </div>
    ));
  };

  return (
    <div
      className={`fixed top-[60px] right-0 h-screen w-screen bg-dark shadow-xl transition-transform duration-500 flex flex-col items-center p-5 ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {renderOptions(options)}
      <Button text="Sign Up" width="w-full" height="h-[52px]" />
    </div>
  );
}

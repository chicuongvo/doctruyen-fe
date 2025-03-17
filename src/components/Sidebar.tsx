import { Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";

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
      <Link to={option.path} key={option.path}>
        <div
          key={option.path}
          className="text-white h-[54px] w-full text-[16px] font-semibold font-spartan flex "
        >
          {option.name}
        </div>
      </Link>
    ));
  };

  const { userProfile } = useUser();

  return (
    <div
      className={`fixed top-[60px] right-0 h-screen w-screen bg-dark shadow-xl transition-transform duration-500 flex z-30 flex-col items-center p-5 ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {renderOptions(options)}
      {userProfile ? (
        <button className="w-full h-[52px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-violet-600 via-primary to-secondary rounded-[15px] cursor-pointer ">
          Sign Out
        </button>
      ) : (
        <Link
          to="/signup"
          className="w-full py-3 border-b border-t border-zinc-700"
        >
          <button className="w-full h-[52px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-violet-600 via-primary to-secondary rounded-[15px] cursor-pointer ">
            Sign Up
          </button>
        </Link>
      )}
    </div>
  );
}

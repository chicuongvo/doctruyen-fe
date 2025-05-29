import { Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";
interface Option {
  name: string;
  path: string;
}
export default function Sidebar({
  setIsSidebarOpen,
  isSidebarOpen,
}: {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
}) {
  const options = [
    { name: "Trang chủ", path: "/" },
    { name: "Truyện", path: "/stories" },
    { name: "Blogs", path: "/blogs" },
    { name: "Tìm kiếm", path: "/search" },
  ];

  const handleOnClick = () => {
    setIsSidebarOpen(false);
  };

  const renderOptions = (options: Option[]) => {
    return options.map((option) => (
      <Link to={option.path} key={option.path}>
        <div
          key={option.path}
          className="text-white h-[54px] w-full text-[16px] font-semibold font-spartan flex "
          onClick={handleOnClick}
        >
          {option.name}
        </div>
      </Link>
    ));
  };

  const { userProfile } = useUser();

  const API_URL = "https://doctruyen-be-e0t7.onrender.com/api";
  const { setUserChanged } = useUser();
  const handleSignOut = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/sign-out`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setUserChanged(true);
        window.location.reload();
      }
    } catch (error) {
      console.log("Error sign out:", error);
    }
  };

  return (
    <header
      className={`fixed top-[60px] right-0 h-screen w-screen bg-dark shadow-xl transition-transform duration-500 flex z-30 flex-col items-center p-5 ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {renderOptions(options)}
      {userProfile ? (
        <button
          className="w-full h-[52px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-primary to-secondary rounded-[15px] cursor-pointer "
          onClick={handleSignOut}
        >
          Đăng xuất
        </button>
      ) : (
        <Link
          to="/signup"
          className="w-full py-3 border-b border-t border-zinc-700"
        >
          <button
            className="w-full h-[52px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-primary to-secondary rounded-[15px] cursor-pointer"
            onClick={handleOnClick}
          >
            Đăng ký
          </button>
        </Link>
      )}
    </header>
  );
}

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Khởi tạo theme từ localStorage hoặc từ class trên document
    const savedTheme =
      localStorage.theme ||
      (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setTheme(savedTheme);
  }, []);

  const changeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    console.log("Theme changed to:", newTheme);
    localStorage.theme = newTheme;
    setTheme(newTheme);
  };

  return (
    <button
      onClick={changeTheme}
      className=" relative p-2 rounded-full dark:bg-white bg-gray-700 dark:hover:bg-gray-300 hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <div className="relative w-6 h-6">
        <Moon
          className={`absolute inset-0 w-6 h-6 text-secondary   transition-all duration-300 ${
            theme === "light"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-0"
          }`}
        />
        <Sun
          className={`absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-300 ${
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </div>
    </button>
  );
}

import signup from "../assets/images/signup.png";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const handleVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const handleVisibleConfirmPassword = () => {
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const [api, contextHolder] = notification.useNotification();
  const API_URL = "https://doctruyen-be-e0t7.onrender.com/api";
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password,
          phone_number,
        }),
      });

      const data = await response.json();

      if (data.success === true) {
        api.success({
          message: "SIGN UP",
          description: "Registration was successful! Please sign in",
        });
        navigate("/");
      } else {
        api.error({
          message: "SIGN UP",
          description: data.message,
        });
      }
      console.log("Server response:", data.success);
    } catch (error) {
      console.log("Error during sign-up:", error);
      console.log(username, email, password, confirm_password);
    }
  };

  return (
    <div className="bg-black font-spartan px-5 py-5 lg:px-60 ">
      {contextHolder}

      <div className="bg-zinc-800 px-8 py-15 rounded-[25px] border-zinc-600 border flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2">
        <div className="text-white flex flex-col justify-center items-center gap-3">
          <div className="font-bold text-3xl ">Sign Up</div>
          <div className="text-lg text-center font-light text-[#e5e7eb]">
            Create FictionMe account
          </div>
          <img
            src={signup}
            alt="signup"
            className="scale-75 hidden md:block "
          />
        </div>

        <form className="flex flex-col w-full gap-5">
          <div className="flex flex-col text-white text-[18px] gap-2">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
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
              required
              className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px]"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="flex flex-col text-white text-[18px] gap-2 relative ">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type={isVisiblePassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-2 bottom-3 text-zinc-400"
              onClick={handleVisiblePassword}
              type="button"
            >
              {isVisiblePassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>

          <div className="flex flex-col text-white text-[18px] gap-2 relative">
            <label htmlFor="confirm_password" className="font-semibold">
              Confirm password
            </label>
            <input
              type={isVisibleConfirmPassword ? "text" : "password"}
              name="confirm_password"
              placeholder="Confirm your password"
              required
              className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px]"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="absolute right-2 bottom-3 text-zinc-400"
              onClick={handleVisibleConfirmPassword}
              type="button"
            >
              {isVisibleConfirmPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          <div className="w-full items-center flex justify-center">
            <button
              className="w-[288px] h-[54px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-violet-600 via-primary to-secondary rounded-[15px] cursor-pointer "
              onClick={handleSignUp}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

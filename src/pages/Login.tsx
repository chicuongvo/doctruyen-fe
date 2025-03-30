import signup from "../assets/images/signup.png";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";

function Login() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const handleVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const [identifier, setIdentifer] = useState("");
  const [password, setPassword] = useState("");

  const [api, contextHolder] = notification.useNotification();
  const API_URL = "https://doctruyen-be-e0t7.onrender.com/api";
  const navigate = useNavigate();
  const { setUserChanged } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();

      if (data.success === true) {
        api.success({
          message: "SIGN IN",
          description: "Signing in successfully!",
        });
        setUserChanged(true);

        if (data.data.is_verified) navigate("/");
        else navigate("/get-verify-token");
      } else {
        api.error({
          message: "SIGN IN",
          description: data.message,
        });
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-black font-spartan px-5 py-5 lg:px-60 ">
      {contextHolder}

      <div className="bg-zinc-800 px-8 py-15 rounded-[25px] border-zinc-600 border flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2">
        <div className="text-white flex flex-col justify-center items-center gap-3">
          <div className="font-bold text-3xl ">Sign In</div>
          <div className="text-lg text-center font-light text-[#e5e7eb]">
            Sign In to your account
          </div>
          <img
            src={signup}
            alt="signup"
            className="scale-75 hidden md:block "
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <form className="flex flex-col w-9/10 gap-5">
            <div className="flex flex-col text-white text-[18px] gap-2">
              <label htmlFor="identifier" className="font-semibold">
                Username/Phone number/Email
              </label>
              <input
                type="text"
                name="identifier"
                placeholder="Username/Phone number/Email"
                required
                className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px]"
                onChange={(e) => setIdentifer(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-white text-[18px] gap-2 relative ">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type={isVisiblePassword ? "text" : "password"}
                name="password"
                placeholder="Password"
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

            <div className="w-full items-center flex justify-center pt-5">
              <button
                className="w-[288px] h-[54px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-violet-600 via-primary to-secondary rounded-[15px] cursor-pointer "
                onClick={handleSignIn}
                type="button"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-2 w-full items-center justify-center">
            <div className="flex flex-row w-ful gap-2">
              <div className="text-white ">Don't have an account yet? </div>
              <Link to="/signup" className="text-primary underline">
                Sign Up
              </Link>
            </div>

            <div className="flex flex-row gap-2">
              <div className="text-white ">Forgot your password? </div>
              <Link
                to="/get-reset-password-token"
                className="text-primary underline"
              >
                Reset
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

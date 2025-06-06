import signup from "../assets/images/signup.png";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { signIn } from "@/api/users.api";
import GoogleSignInButton from "@/components/GoogleSignIn";

function Login() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const handleVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const [identifier, setIdentifer] = useState("");
  const [password, setPassword] = useState("");

  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { setUserChanged } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const response = await signIn({ identifier, password });

      const data = response.data;

      if (data.success === true) {
        api.success({
          message: "ĐĂNG NHẬP",
          description: "Đăng nhập thành công!",
        });
        setUserChanged(true);

        if (data.data.is_verified) navigate("/");
        else navigate("/get-verify-token");
      } else {
        api.error({
          message: "ĐĂNG NHẬP",
          description: data.message,
        });
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        api.error({
          message: "ĐĂNG NHẬP",
          description: error.response.data.message,
        });
      } else {
        api.error({
          message: "ĐĂNG NHẬP",
          description: "Lỗi không xác định!",
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-black font-spartan px-5 py-5 lg:px-60 dark:bg-white ">
      {contextHolder}

      <div className="dark:bg-zinc-100 bg-zinc-800 px-8 py-15 rounded-[25px] border-zinc-600  border flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2">
        <div className="text-white dark:text-black flex flex-col justify-center items-center gap-3">
          <div className="font-bold text-3xl ">Đăng nhập</div>
          <div className="text-lg text-center font-light text-[#e5e7eb] dark:text-zinc-800">
            Đăng nhập vào tài khoản của bạn
          </div>
          <img
            src={signup}
            alt="signup"
            className="scale-75 hidden md:block "
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <form className="flex flex-col w-9/10 gap-5">
            <div className="flex flex-col text-white dark:text-black text-[18px] gap-2">
              <label htmlFor="identifier" className="font-semibold">
                Tên đăng nhập/SĐT/Email
              </label>
              <input
                type="text"
                name="identifier"
                placeholder="Tên đăng nhập/SĐT/Emaill"
                required
                className="px-3 py-3 w-full border text-white dark:text-black dark:bg-zinc-200 border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px]"
                onChange={(e) => setIdentifer(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-white text-[18px] gap-2 relative dark:text-black ">
              <label htmlFor="password" className="font-semibold">
                Mật khẩu
              </label>
              <input
                type={isVisiblePassword ? "text" : "password"}
                name="password"
                placeholder="Mật khẩu"
                required
                className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px] dark:text-black dark:bg-zinc-200"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-2 bottom-3 text-zinc-400 dark:text-zinc-600"
                onClick={handleVisiblePassword}
                type="button"
              >
                {isVisiblePassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>

            <div className="w-full flex-col gap-3 items-center flex justify-center pt-5">
              <button
                className="w-[288px] h-[54px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-primary to-secondary rounded-[15px] cursor-pointer "
                onClick={handleSignIn}
                // type="button"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
              <span className="text-white dark:text-black">hoặc</span>
              <GoogleSignInButton />
            </div>
          </form>

          <div className="flex flex-col gap-2 w-full items-center justify-center">
            <div className="flex flex-row w-ful gap-2">
              <div className="text-white dark:text-black">
                Chưa có tài khoản?{" "}
              </div>
              <Link to="/signup" className="text-primary underline ">
                Đăng ký
              </Link>
            </div>

            <div className="flex flex-row gap-2">
              <div className="text-white dark:text-black">Quên mật khẩu? </div>
              <Link
                to="/get-reset-password-token"
                className="text-primary underline"
              >
                Lấy lại mật khẩu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

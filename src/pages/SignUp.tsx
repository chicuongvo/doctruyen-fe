import signup from "../assets/images/signup.png";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import user from "../assets/images/user.jpg";
import { createUser } from "@/api/users.api";

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

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
  const navigate = useNavigate();

  const { setUserChanged } = useUser();

  const handleSignUp = async () => {
    setIsLoading(true);

    try {
      const response = await createUser({
        username,
        email,
        phone_number,
        password,
        confirm_password,
        profile_pic: user,
      });

      const data = response.data;

      if (data.success === true) {
        setUserChanged(true);
        navigate("/get-verify-token");
      } else {
        api.error({
          message: "ĐĂNG KÝ",
          description: data.message,
        });
      }
    } catch (error: any) {
      console.log("Error during sign-up:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-black font-spartan px-5 py-5 lg:px-60 ">
      {contextHolder}

      <div className="bg-zinc-800 px-8 py-15 rounded-[25px] border-zinc-600 border flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2">
        <div className="text-white flex flex-col justify-center items-center gap-3">
          <div className="font-bold text-3xl ">Đăng ký</div>
          <div className="text-lg text-center font-light text-[#e5e7eb]">
            Tạo tài khoản mới
          </div>
          <img
            src={signup}
            alt="signup"
            className="scale-75 hidden md:block "
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <form className="flex flex-col w-9/10  gap-5">
            <div className="flex flex-col text-white text-[18px] gap-2">
              <label htmlFor="username" className="font-semibold">
                Tên đăng nhập
              </label>
              <input
                type="text"
                name="username"
                placeholder="Nhập tên đăng nhập"
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
                placeholder="Nhập email"
                required
                className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px]"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-white text-[18px] gap-2">
              <label htmlFor="phone" className="font-semibold">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Nhập số điện thoại"
                required
                className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px]"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-white text-[18px] gap-2 relative ">
              <label htmlFor="password" className="font-semibold">
                Mật khẩu
              </label>
              <input
                type={isVisiblePassword ? "text" : "password"}
                name="password"
                placeholder="Nhập mật khẩu"
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
                Xác nhận mật khẩu
              </label>
              <input
                type={isVisibleConfirmPassword ? "text" : "password"}
                name="confirm_password"
                placeholder="Xác nhận mật khẩu"
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
            <div className="w-full items-center flex justify-center pt-5">
              <button
                className="w-[288px] h-[54px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-violet-600 via-primary to-secondary rounded-[15px] cursor-pointer "
                onClick={handleSignUp}
                type="button"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </div>
          </form>

          <div className="flex flex-row gap-2 ">
            <div className="text-white">Đã có tài khoản? </div>
            <Link to="/login" className="text-primary underline">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

import mail from "../assets/images/mail.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { notification } from "antd";
import { resetPassword } from "@/api/users.api";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const handleVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const handleVisibleConfirmPassword = () => {
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);
  };

  const navigate = useNavigate();
  const { reset_password_token } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await resetPassword(reset_password_token || "", {
        new_password: password,
        confirm_new_password: confirmPassword,
      });

      const data = response.data;

      if (data.success === true) {
        api.success({
          message: "Đặt lại mật khẩu",
          description: "Đặt lại mật khẩu thành công!",
        });
        setTimeout(() => navigate("/"), 1500);
      } else {
        api.error({
          message: "Đặt lại mật khẩu",
          description: data.message,
        });
      }
    } catch (error) {
      console.log("Error during reset password:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-black font-spartan px-5 py-5 lg:px-60 dark:bg-white">
      {contextHolder}
      <div className="dark:bg-zinc-100 bg-zinc-800 px-8 py-15 rounded-[25px] border-zinc-600 border flex flex-col justify-center items-center gap-10 ">
        <div className="text-white flex flex-col justify-center items-center gap-3 dark:text-black">
          <div className="font-bold text-3xl ">Đặt lại mật khẩu</div>
          <div className="text-lg text-center font-light text-[#e5e7eb] dark:text-zinc-800">
            Điền các trường phía dưới để đặt lại mật khẩu{" "}
          </div>
          <img src={mail} alt="mail" className="scale-125" />
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <form className="flex flex-col w-full gap-5">
            <div className="flex flex-col text-white text-[18px] gap-2 relative ">
              <label
                htmlFor="password"
                className="font-semibold dark:text-black"
              >
                Mật khẩu mới
              </label>
              <input
                type={isVisiblePassword ? "text" : "password"}
                name="password"
                placeholder="Nhập mật khẩu mới"
                required
                className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px] dark:text-black dark:bg-zinc-200"
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
              <label
                htmlFor="confirm_password"
                className="font-semibold dark:text-black "
              >
                Xác nhận mật khẩu
              </label>
              <input
                type={isVisibleConfirmPassword ? "text" : "password"}
                name="confirm_password"
                placeholder="Xác nhận mật khẩu"
                required
                className="px-3 py-3 w-full border text-white border-primary bg-zinc-950 rounded-xl focus:outline-none text-[16px] dark:text-black dark:bg-zinc-200"
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
                onClick={handleResetPassword}
                type="button"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

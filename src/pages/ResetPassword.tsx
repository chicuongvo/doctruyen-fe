import mail from "../assets/images/mail.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { notification } from "antd";

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

  const API_URL = "https://doctruyen-be-e0t7.onrender.com/api";
  const navigate = useNavigate();
  const { reset_password_token } = useParams();
  const [api, contextHolder] = notification.useNotification();

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        `${API_URL}/auth/reset-password/${reset_password_token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            new_password: password,
            confirm_new_password: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        api.success({
          message: "Reset Password",
          description: "Reset password successfully",
        });
        setTimeout(() => navigate("/"), 1500);
      } else {
        api.error({
          message: "Reset Password",
          description: data.message,
        });
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
    }
  };

  return (
    <div className="bg-black font-spartan px-5 py-5 lg:px-60 ">
      {contextHolder}
      <div className="bg-zinc-800 px-8 py-15 rounded-[25px] border-zinc-600 border flex flex-col justify-center items-center gap-10 ">
        <div className="text-white flex flex-col justify-center items-center gap-3">
          <div className="font-bold text-3xl ">Restore Password</div>
          <div className="text-lg text-center font-light text-[#e5e7eb]">
            We will send an email to your inbox to reset your password
          </div>
          <img src={mail} alt="mail" className="scale-125" />
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <form className="flex flex-col w-full gap-5">
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
            <div className="w-full items-center flex justify-center pt-5">
              <button
                className="w-[288px] h-[54px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-violet-600 via-primary to-secondary rounded-[15px] cursor-pointer "
                onClick={handleResetPassword}
                type="button"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

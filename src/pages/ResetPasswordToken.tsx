import mail from "../assets/images/mail.png";
import { useState } from "react";
import { notification } from "antd";

function ResetPasswordToken() {
  const [email, setEmail] = useState("");

  const API_URL = "https://doctruyen-be-e0t7.onrender.com/api";
  const [api, contextHolder] = notification.useNotification();

  const handleSend = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/get-reset-password-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (data.success === true) {
        api.success({
          message: "Send email",
          description: "Send email successfully!",
        });
      } else {
        api.error({
          message: "Send email",
          description: data.message,
        });
      }
    } catch (error) {
      console.log("Error during get reset password token:", error);
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

            <div className="w-full items-center flex justify-center pt-5">
              <button
                className="w-[288px] h-[54px] font-spartan text-[18px] font-semibold text-white bg-gradient-to-r hover:bg-gradient-to-l transition-all duration-1000 ease-in-out from-violet-600 via-primary to-secondary rounded-[15px] cursor-pointer "
                onClick={handleSend}
                type="button"
              >
                Send
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-2 w-full items-center justify-center">
            <div className="flex flex-row w-ful gap-2">
              <div className="text-white ">
                If you continue, you agree to our
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <div className="text-primary underline">Terms of Use</div>
              <div className="text-white"> and </div>
              <div className="text-primary underline">Privacy Policy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordToken;

import { useState } from "react";
import verified from "../assets/images/verified.png";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "@/api/users.api";

export default function VerifyAccount() {
  const [verificationToken, setVerificationToken] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyAccount = async () => {
    setIsLoading(true);
    try {
      const response = await verifyEmail(verificationToken);

      const data = response.data;

      if (data.success) {
        api.success({
          message: "VERIFY ACCOUNT",
          description: "Verify your account successfully!",
        });
        setTimeout(() => navigate("/"), 1400);
      } else {
        api.error({
          message: "VERIFY ACCOUNT",
          description: data.message,
        });
      }
    } catch (error) {
      console.log("Error verify account:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-black font-spartan px-4 py-5 lg:px-60 text-white flex justify-center">
      {contextHolder}

      <div className="bg-zinc-800 px-6 py-15 rounded-[25px] border-zinc-600 border flex flex-col justify-center items-center gap-5 md:w-3/5">
        <div className="text-3xl font-bold ">Xác Minh Tài Khoản</div>
        <img src={verified} alt="verified" className="w-20 h-20" />

        <form className="flex flex-col gap-5 items-center justify-center">
          <input
            type="text"
            required
            placeholder="Nhập mã"
            className="w-[220px] py-3 px-2 bg-white text-black focus:outline-none border border-primary rounded-[15px]"
            onChange={(e) => setVerificationToken(e.target.value)}
          />
          <button
            type="button"
            className="bg-primary w-4/5 text-white py-3 rounded-[15px] font-semibold text-md hover:bg-secondary transition-all duration-300 cursor-pointer"
            onClick={handleVerifyAccount}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý.." : "Xác minh"}
          </button>
        </form>
      </div>
    </div>
  );
}

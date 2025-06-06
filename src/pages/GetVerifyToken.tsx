import { Link, useNavigate } from "react-router-dom";
import verified from "../assets/images/verified.png";
import { notification } from "antd";
import { requestEmailVerification } from "@/api/users.api";

export default function GetVerifyToken() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const handleSendToken = async () => {
    try {
      const response = await requestEmailVerification();

      const data = response.data;

      if (data.success) {
        api.success({
          message: "LẤY MÃ XÁC MINH",
          description: "Mã xác minh đã được gửi tới email của bạn!",
        });

        setTimeout(() => navigate("/verify-account"), 1400);
      }
    } catch (error) {
      console.log("Error get verification token:", error);
    }
  };
  return (
    <div className="bg-black font-spartan px-4 py-5 lg:px-60 text-white flex justify-center dark:bg-white dark:text-black">
      {contextHolder}

      <div className="dark:bg-zinc-100 bg-zinc-800 px-6 py-15 rounded-[25px] border-zinc-600 border flex flex-col justify-center items-center gap-10 md:w-3/5">
        <div className="text-3xl font-bold ">Xác Minh Tài Khoản</div>
        <img src={verified} alt="verified" />
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-[20px] flex flex-row">
            Nhấn vào &nbsp;
            <div
              className="text-primary underline font-bold italic cursor-pointer"
              onClick={handleSendToken}
            >
              đây
            </div>
            &nbsp; để xác minh tài khoản
          </div>
          <div>hoặc</div>
          <div className="text-[20px] flex flex-row">
            Xác nhận &nbsp;
            <Link
              to="/"
              className="text-primary underline font-bold italic cursor-pointer"
            >
              sau
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

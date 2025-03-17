import { Link, useNavigate } from "react-router-dom";
import verified from "../assets/images/verified.png";

export default function GetVerifyToken() {
  const API_URL = "https://doctruyen-be-e0t7.onrender.com/api";
  const navigate = useNavigate();
  const handleSendToken = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/get-verification-token`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        navigate("/verify-account");
      }
    } catch (error) {
      console.log("Error get verification token:", error);
    }
  };
  return (
    <div className="bg-black font-spartan px-4 py-5 lg:px-60 text-white flex justify-center">
      <div className="bg-zinc-800 px-6 py-15 rounded-[25px] border-zinc-600 border flex flex-col justify-center items-center gap-10 md:w-3/5">
        <div className="text-3xl font-bold ">Get Verification Token</div>
        <img src={verified} alt="verified" />
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-[20px] flex flex-row">
            Click &nbsp;
            <div
              className="text-primary underline font-bold italic cursor-pointer"
              onClick={handleSendToken}
            >
              here
            </div>
            &nbsp; to verify your account
          </div>
          <div>or</div>
          <div className="text-[20px] flex flex-row">
            Do it &nbsp;
            <Link
              to="/"
              className="text-primary underline font-bold italic cursor-pointer"
            >
              later
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

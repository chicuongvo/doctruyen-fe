import { useGoogleLogin } from "@react-oauth/google";
import google from "../assets/images/gg.png";
import { useNavigate } from "react-router-dom";

const GoogleSignInButton = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const nav = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const response = await fetch(`${BASE_URL}/oauth/google`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: credentialResponse.access_token }),
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem("token", data.token);
          nav("/");
          window.location.reload();
        }
      } catch (error) {
        console.log("Error sign in by google: ", error);
      }
    },
    onError: () => console.log("Login Failed!"),
  });

  return (
    <button
      onClick={() => login()}
      className="w-[288px] rounded-[15px] border-zinc-300 dark:border-zinc-700 border cursor-pointer text-[16px] font-spartan text-[16px] font-semibold py-2 flex flex-row gap-3 items-center justify-center text-white dark:text-black"
    >
      <img src={google} alt="google" className="w-10" />
      Đăng nhập bằng Google
    </button>
  );
};

export default GoogleSignInButton;

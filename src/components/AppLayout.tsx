import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "@/pages/Chatbot";
function AppLayout() {
  return (
    <div>
      <Chatbot />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;

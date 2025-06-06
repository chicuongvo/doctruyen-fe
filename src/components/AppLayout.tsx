import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "@/pages/Chatbot";
import { Scroll } from "lucide-react";
import ScrollToTop from "./ScrollToTop";
function AppLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Chatbot />
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default AppLayout;

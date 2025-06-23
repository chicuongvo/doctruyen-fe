import { Bot } from "lucide-react";
import { useState } from "react";

import ChatbotPages from "@/pages/Chatbot";
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed z-999 bottom-4 right-5 bg-white hover:bg-white/80 p-3 rounded-full shadow-lg transition-colors duration-300 ">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[90vw] lg:w-[50vw] h-[500px]">
          {" "}
          <ChatbotPages />{" "}
        </div>
      )}

      <Bot
        className="w-6 h-6 text-secondary cursor-pointer "
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
    </div>
  );
}

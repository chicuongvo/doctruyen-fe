import { Bot, BotMessageSquare, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useUser } from "../contexts/userContext";

interface UserProfile {
  username: string;
  email: string;
  phone_number: string;
  is_verified: boolean;
  fullname: string;
  profile_pic: string;
}

interface message {
  sender: UserProfile | string;
  content: string;
  timestamps: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<message[]>([
    {
      sender: "bot",
      content: "Chào bạn, tôi có thể giúp được gì cho bạn?",
      timestamps: new Date(),
    },
  ]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [question, setQuestion] = useState("");
  const [formData, setFormData] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { userProfile } = useUser();
  const [sendingMessage, setSendingMessage] = useState(false);

  const renderMessages = (messages: message[]) => {
    return messages.map((message, idx) => {
      const isBot = message.sender === "bot";
      return (
        <div
          key={idx}
          className={`flex items-start gap-3 mb-4 ${
            isBot ? "justify-start" : "justify-end"
          }`}
        >
          {isBot && (
            <div className="bg-violet-200 rounded-full p-2">
              <Bot className="text-secondary w-6 h-6" />
            </div>
          )}

          <div>
            <div
              className="bg-zinc-700 text-zinc-200 text-sm p-3 rounded-xl max-w-[400px] break-words"
              dangerouslySetInnerHTML={{
                __html: message.content
                  .replace(/^```html\s*/i, "")
                  .replace(/```$/, ""),
              }} // Xóa dòng kết thúc ``` }}
            ></div>
            <div
              className={`text-zinc-400 text-xs mt-1 ${isBot ? "text-start" : "text-end"} `}
            >
              {message.timestamps.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          {!isBot &&
            typeof message.sender === "object" &&
            message.sender.profile_pic && (
              <img
                src={message.sender.profile_pic}
                className="w-10 h-10 rounded-full"
              />
            )}
        </div>
      );
    });
  };

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSendMessage = async (e: React.FormEvent) => {
    setSendingMessage(true);
    setFormData("");

    e.preventDefault();

    if (userProfile) {
      setMessages((prev) => [
        ...prev,
        {
          sender: userProfile,
          content: question,
          timestamps: new Date(),
        },
      ]);

      const response = await fetch(`${API_URL}/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      });

      setQuestion("");
      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            content: data.message,
            timestamps: new Date(),
          },
        ]);
        console.log(data.message);
      }
    }

    setSendingMessage(false);
  };

  return (
    <div className="fixed z-999 bottom-4 right-5 bg-white dark:bg-black hover:bg-white/80 p-3 rounded-full shadow-lg transition-colors duration-300">
      <Bot
        className="w-6 h-6 text-secondary cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[90vw] lg:w-[50vw] h-[500px] bg-black flex justify-center items-center font-spartan overflow-hidden rounded-[20px]">
          <div className=" h-full w-full bg-zinc-800 text-white flex flex-col justify-between">
            <div className="flex flex-row px-5 py-4 gap-4 w-full bg-gradient-to-r from-violet-600 via-primary to-secondary rounded-t-[15px] items-center">
              <div>
                <BotMessageSquare className="w-8 h-8" />
              </div>
              <div className="font-semibold text-[22px]">Trợ lí AI</div>
            </div>

            <div
              className="flex-1 h-[450px] py-7 px-5 overflow-y-auto no-scrollbar"
              ref={messagesEndRef}
            >
              {renderMessages(messages)}
              {sendingMessage && (
                <div className="flex flex-row justify-start gap-3">
                  <div className="bg-violet-200 rounded-full p-1">
                    <Bot className="text-secondary w-8 h-8" />
                  </div>
                  <div className="bg-zinc-700 text-zinc-200 text-sm p-3 rounded-xl max-w-[300px] break-words flex justify-center items-center">
                    <div className="w-full gap-x-2 flex justify-center items-center">
                      <div className="w-2 bg-primary animate-pulse h-2 rounded-full animate-bounce flex justify-center items-center"></div>
                      <div className="w-2 animate-pulse h-2 bg-secondary rounded-full animate-bounce flex justify-center items-center"></div>
                      <div className="w-2 h-2 animate-pulse bg-violet-300 rounded-full animate-bounce flex justify-center items-center"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-500">
              <form className="px-4 py-3 flex flex-row gap-3">
                <input
                  className="border border-zinc-500 rounded-[15px] w-full px-2 py-3 focus:outline-primary"
                  type="text"
                  value={formData}
                  placeholder="Type your message..."
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    setFormData(e.target.value);
                    console.log(question);
                  }}
                />

                <button
                  type="submit"
                  className="bg-secondary rounded-[15px] hover:bg-primary transtion-all duration-300 cursor-pointer"
                  onClick={handleSendMessage}
                  disabled={question.length === 0}
                >
                  <div className="px-5 py-2 ">
                    <Send className="w-6 h-6 " />
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

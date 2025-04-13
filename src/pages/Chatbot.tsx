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
      content: "Hello, how can I help you?",
      timestamps: new Date(),
    },
  ]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [question, setQuestion] = useState("");

  const { userProfile } = useUser();

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
            <div className="bg-violet-200 rounded-full p-1">
              <Bot className="text-secondary w-8 h-8" />
            </div>
          )}

          <div>
            <div className="bg-zinc-700 text-zinc-200 text-sm p-3 rounded-xl max-w-[300px] break-words">
              {message.content}
            </div>
            <div
              className={`text-zinc-400 text-xs mt-1 ${isBot ? "text-start" : "text-end"}`}
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

  const handleSendMessage = (e: React.FormEvent) => {
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
    }

    setQuestion("");
  };

  return (
    <div className="bg-black w-full h-max flex justify-center items-center font-spartan">
      <div className=" w-9/10 h-[450px] md:h-[600px] bg-zinc-800 my-10 rounded-[20px] text-white flex flex-col justify-between">
        <div className="flex flex-row px-5 py-4 gap-4 w-full bg-gradient-to-r from-violet-600 via-primary to-secondary rounded-t-[15px] items-center">
          <div>
            <BotMessageSquare className="w-8 h-8" />
          </div>
          <div className="font-semibold text-[22px]">AI Assistant</div>
        </div>

        <div
          className="flex-1 h-[450px] py-7 px-5 overflow-y-auto no-scrollbar"
          ref={messagesEndRef}
        >
          {renderMessages(messages)}
        </div>

        <div className="border-t border-zinc-500">
          <form className="px-2 py-3 flex flex-row gap-3">
            <input
              className="border border-zinc-500 rounded-[15px] w-full px-2 py-3"
              type="text"
              value={question}
              placeholder="Type your message..."
              onChange={(e) => {
                setQuestion(e.target.value);
                console.log(question);
              }}
            />

            <button
              type="submit"
              className="bg-secondary rounded-[15px] hover:bg-primary transtion-all duration-300 cursor-pointer"
              onClick={handleSendMessage}
            >
              <div className="px-5 py-2 ">
                <Send className="w-6 h-6 " />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Phone,
  Video,
  MoreVertical,
  SendHorizontal,
  Smile,
} from "lucide-react";
import { useSocket } from "../Context/socketContext";
import EmojiPicker from "emoji-picker-react";

const Right = ({ selectedUser }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const [text, setText] = useState("");

  const { socket } = useSocket();


  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message) => {
      if (selectedUser && message.senderId === selectedUser._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, selectedUser]);



  useEffect(() => {
    if (!selectedUser) return;

    getMessages();

    const interval = setInterval(() => {
      getMessages();
    }, 3000);

    return () => clearInterval(interval);

  }, [selectedUser]);



  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const getMessages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/message/${selectedUser._id}`,
        {
          withCredentials: true,
        }
      );

      setMessages(res.data.message || []);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/message/send/${selectedUser._id}`,
        {
          message: text,
        },
        {
          withCredentials: true,
        }
      );

      setText("");

      getMessages();

    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#030712]">
        <h1 className="text-3xl text-gray-500">
          <i>Convey Always With You ❤️</i>
        </h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#030712]">

      <div className=" relative top-20 sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#111827] px-3 md:px-6 py-4">
      
        <div className="flex items-center gap-3 flex-1 min-w-0 ">

          <img
            src={
              selectedUser.profile ||
              `https://ui-avatars.com/api/?name=${selectedUser.fullname}`
            }
            className="h-12 w-12 rounded-full object-cover"
          />

          <div className="min-w-0">
            <h2 className="text-base md:text-lg font-semibold text-white truncate">
              {selectedUser.fullname}
            </h2>

            <p className="text-xs md:text-sm text-gray-400 truncate">
              {selectedUser.email}
            </p>
          </div>

        </div>

        <div className="flex gap-4">

          {/* <button className="rounded-xl bg-[#1f2937] p-2">
            <Phone className="text-white" size={20} />
          </button>

          <button className="rounded-xl bg-[#1f2937] p-2">
            <Video className="text-white" size={20} />
          </button> */}

          <button className="rounded-xl bg-[#2e3947] text-gray-300 px-2 py-2 text-xs md:text-sm whitespace-nowrap">
            <span className="hidden sm:inline">Developer Yomesh</span>
            <span className="sm:hidden">Dev</span>
          </button>

        </div>

      </div>

      <div className="flex-1 overflow-y-auto p-6">

        <div className="space-y-4">

          {messages.map((msg) => (

            <div
              key={msg._id}
              className={`flex ${msg.senderId === selectedUser._id
                ? "justify-start"
                : "justify-end"
                }`}
            >

              <div
                className={`max-w-sm rounded-2xl px-4 py-3 ${msg.senderId === selectedUser._id
                  ? "bg-[#1f2937] text-white"
                  : "bg-blue-600 text-white"
                  }`}
              >

                <p>{msg.message}</p>

                <p className="mt-1 text-right text-xs opacity-70">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

              </div>

            </div>

          ))}

          <div ref={bottomRef}></div>

        </div>

      </div>

      <div className="border-t border-white/10 bg-[#111827] p-5">

        <div className="flex items-center gap-2 w-full">

          <button
            type="button"
            onClick={() => setShowEmoji((prev) => !prev)}
            className="text-gray-400"
          >
            <Smile size={24} />
          </button>

          <div className="relative">
            {showEmoji && (
              <div className="absolute bottom-14 left-0 z-50">
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    setText((prev) => prev + emojiData.emoji);
                    setShowEmoji(false);
                  }}
                />
              </div>
            )}
          </div>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type a message..."
            className="flex-1 min-w-0 rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 text-white outline-none"
          />

          <button
            onClick={sendMessage}
            className="rounded-xl bg-blue-600 p-3 hover:bg-blue-700 transition"
          >
            <SendHorizontal className="text-white" size={20} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default Right;
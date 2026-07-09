import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useSocket } from "../Context/socketContext";

const Left = ({
  selectedUser,
  setSelectedUser,
}) => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const {
    socket,
    onlineUsers,
    notificationUsers,
    setNotificationUsers,
  } = useSocket();


  useEffect(() => {
    getUsers();
  }, []);


  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/all-users`,
        {
          withCredentials: true,
        }
      );

      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message) => {
      setUsers((prev) => {
        const sender = prev.find(
          (u) => u._id.toString() === message.senderId.toString()
        );

        const remaining = prev.filter(
          (u) => u._id.toString() !== message.senderId.toString()
        );

        return [sender, ...remaining];
      });

      setNotificationUsers((prev) => {
        if (prev.includes(message.senderId)) return prev;

        return [...prev, message.senderId];
      });
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);



  const filteredUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const openChat = (user) => {
    setSelectedUser(user);

    setNotificationUsers((prev) =>
      prev.filter((id) => id !== user._id)
    );
  };

  return (
    <div className="flex h-screen flex-col border-r border-white/10 bg-[#030712]">

      <div className="p-5 border-b border-white/10">

        <h1 className="text-3xl font-bold text-white">
          Convey
        </h1>

        <div className="relative mt-5">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-[#111827] py-3 pl-11 pr-4 text-white outline-none"
          />

        </div>

      </div>


      <div className="flex-1 overflow-y-auto">

        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => openChat(user)}
              className={`flex cursor-pointer items-center justify-between px-5 py-4 transition
        ${selectedUser?._id === user._id
                  ? "bg-[#1e40af]"
                  : "hover:bg-[#111827]"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={
                      user.profile ||
                      `https://ui-avatars.com/api/?name=${user.fullname}`
                    }
                    className="h-14 w-14 rounded-full object-cover"
                  />

                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#030712] bg-green-500"></span>
                  )}
                </div>

                <div>
                  <h2 className="font-semibold text-white">{user.fullname}</h2>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>

              {notificationUsers.includes(user._id) && (
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
              )}
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 font-medium">
            No User Found
          </div>
        )}

      </div>

    </div>
  );
};

export default Left;
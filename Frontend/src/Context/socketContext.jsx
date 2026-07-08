import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./authContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
  autoConnect: false,
  withCredentials: true,
});

export const SocketProvider = ({ children }) => {
  const { authUser } = useAuth();

  const [onlineUsers, setOnlineUsers] = useState([]);

  // Notification users (red dot)
  const [notificationUsers, setNotificationUsers] = useState([]);

  useEffect(() => {
    if (!authUser) return;

    socket.connect();

    socket.emit("join", authUser._id);

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
      socket.disconnect();
    };
  }, [authUser]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        notificationUsers,
        setNotificationUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
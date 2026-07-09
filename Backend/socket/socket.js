import { Server } from "socket.io";

let io;

const userSocketMap = {};

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "https://convey-sigma.vercel.app",
        "http://localhost:5173",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    socket.on("join", (userId) => {
      userSocketMap[userId] = socket.id;

      io.emit("onlineUsers", Object.keys(userSocketMap));
    });

    socket.on("disconnect", () => {
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }

      io.emit("onlineUsers", Object.keys(userSocketMap));

      console.log("Socket Disconnected:", socket.id);
    });
  });
};

export { initSocket, io, userSocketMap };
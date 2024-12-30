import express from "express";
import { logInfo } from "./utils/log.js";
import { Server } from "socket.io";

const app = express();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  logInfo("Server listening on port " + port);
  logInfo("http://localhost:" + port);
});

app.get("/", (_, res) => {
  res.send("Hi there");
});

// socket io //
const io = new Server(server, {
  cors: { origin: "*" },
});

let connectedUsers = [];
io.on("connection", (socket) => {
  // logInfo(`socket ${socket.id} connected`);

  socket.on("login", (userId) => {
    logInfo(userId);

    if (!socket.rooms.has(userId)) {
      socket.join(userId);
      // if socket connection goes off, we don't want array to contain dup when socket is established again //
      if (!connectedUsers.includes(userId)) connectedUsers.push(userId);
    }

    // send a list of online users to all online users //
    connectedUsers.forEach((user) => {
      io.to(user).emit("online-users", connectedUsers);
    });
  });

  socket.on("logout", (userId) => {
    logInfo(userId, "room is removed!");

    // remove user room //
    socket.leave(userId);
    connectedUsers = connectedUsers.filter((id) => id !== userId);

    // send a list of online users to all online users //
    connectedUsers.forEach((user) => {
      io.to(user).emit("online-users", connectedUsers);
    });
  });
});

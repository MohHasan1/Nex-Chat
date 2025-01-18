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

let connectedUsers = []; // explore redis for better solution
io.on("connection", (socket) => {
  // logInfo(`socket ${socket.id} connected`);

  socket.on("login", (userId) => {
    logInfo("room created for: ", userId);

    if (!socket.rooms.has(userId)) {
      // create a room //
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

  socket.on("new-message", (payload) => {
    logInfo(payload);

    const users = payload.chat.users;

    users.forEach((user) => {
      io.to(user._id).emit("received_message", payload);
    });
  });
});

const express = require("express");
const socket = require("socket.io");

const app = express();
app.use(express.static("public"));

var server = app.listen(1234, () => {
  console.log("[+] conected on port 1234");
});

// socket init
var io = socket(server);
io.on("connection", (socket) => {
  console.log("socket conected");

  socket.on("msg_chat", (data) => {
    io.sockets.emit("msg_chat", { ...data, typeing: false });
    console.log({ ...data, typeing: false });
  });
  socket.on("typeing", (data) => {
    socket.broadcast.emit("msg_chat", { ...data, typeing: true });
    console.log({ ...data, typeing: true });
  });
});

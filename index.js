const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use("/", express.static("./client"));

io.on("connection", (socket) => {
    console.log("connected socket");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    })

})

server.listen(3000, () => {
    console.log("server is running on port 3000...");
});
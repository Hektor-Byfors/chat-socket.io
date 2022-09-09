const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use("/", express.static("./client"));

io.on("connection", (socket) => {

    socket.on("disconnect", () => {
        console.log("user disconnected");
    })

    socket.on("nickname", data => {
        console.log("user " + data);
    })

    socket.on("room", data => {
        //console.log("room join " + data);
        socket.join(data);
        //console.log(io.sockets.adapter.rooms );
    })

})

server.listen(3000, () => {
    console.log("server is running on port 3000...");
});
import express from 'express';
import http from 'http'
import { Server } from "socket.io";

const app = express();
app.set("view engine", "pug");
app.set("views",__dirname + "/views");
app.use('/public',express.static(__dirname+'/public'));
app.get('/', (_, res) => res.render("home"));
app.get('/*',(_,res) => res.redirect('/'))

const handleListen = () => console.log('http://localhost:3000')

const httpServer  = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
    socket.on("enter_room", (roomName, done) => {
        console.log(roomName);
        setTimeout(() => {
            done("hello from the backend");
        }, 15000);
    });
});
// const wss = new WebSocket.Server({server})
//
// const sockets = [];

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket['nickName'] = 'ANON'
//     console.log("Connected to Browser ✅");
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg)
//         switch (message.type){
//             case 'new_message' :
//                 return sockets.forEach((aSocket) => aSocket.send(`${socket.nickName} : ${message.payload}`));
//             case 'nickname' :
//                 socket['nickName'] = message.payload
//         }
//     });
// });


httpServer.listen(3000, handleListen)

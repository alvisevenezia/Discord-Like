const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let listUser = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('welcome', "bienvenue sur le serveur !!");

    socket.on('userConnect', (data) => {
        console.log("connecttion of "+data);

        for (let user of listUser){

            if (user.name.toLowerCase() == data.toLowerCase()){
                socket.emit('Error',data+' already taken');
                return;
            }

        }

        let user = {
            name: data,
            socket: socket
        }
        listUser.push(user);
        sendConnectedUsers();
    });

});

function sendConnectedUsers(){

    let listConnectedUsers = [];

    for (let user of listUser){
        listConnectedUsers.push(user.name);
    }

    io.emit('listConnectedUsers',listConnectedUsers);

}

server.listen(3000, () => {
    console.log('listening on *:3000');
});
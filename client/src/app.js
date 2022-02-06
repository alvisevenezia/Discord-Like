console.log("test")

var socket = io("http://localhost:3000");

var text = document.getElementById('text');

socket.on("welcome", (msg) => {
    text.innerText = msg;
})
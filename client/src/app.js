function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

let socket;
let connectedUsers = [];

docReady(() => {
    console.log("test")

    socket = io("http://localhost:3000");
    let text = document.getElementById('text');

    socket.on("welcome", (msg) => {
        text.innerText = msg;
    })

    socket.on('Error', (data) =>{
        text.style.color = 'red';
        text.innerText = data;
    })

    socket.on("listConnectedUsers", (list) =>{
        connectedUsers = list;
        console.log(connectedUsers);
    })
})

function sendPacket(eventName,data){
    socket.emit(eventName,data);
}

function loginFunction() {
    sendPacket('userConnect', document.getElementById('pseudo').value);
}

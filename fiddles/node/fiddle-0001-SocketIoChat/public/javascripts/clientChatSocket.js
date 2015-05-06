var socket = io();
socket.on('chat message', function (msg) {
    var userName = msg.userName,
        newMessage = msg.message,
        messages = document.getElementById('chatMessages'),
        messageEntry = document.createElement("div");
    messageEntry.class = "message";
    messageEntry.innerHTML = '<span style="color: #7FFFD4;">' + userName + '</span> - ' + newMessage;
    messages.appendChild(messageEntry);
});

socket.on('begin chat', function (msg) {
    var messages = document.getElementById('chatMessages'),
        messageEntry = document.createElement("div");
    messageEntry.class = "message";
    messageEntry.innerHTML = msg;
    messages.appendChild(messageEntry);
});

function beginChat() {
    var hiddenUserName = document.getElementById("hiddenUserName"),
        myUserName = hiddenUserName ? hiddenUserName.value : null;
    if (myUserName) {
        socket.emit('begin chat', myUserName);
    }
}

function send() {
    var textMessage = document.getElementById('textMessage'),
        hiddenUserName = document.getElementById("hiddenUserName"),
        myUserName = hiddenUserName.value,
        socketMessage = {
            userName: myUserName,
            message: textMessage.value
        };
    socket.emit('chat message', socketMessage);
    textMessage.value = '';
}
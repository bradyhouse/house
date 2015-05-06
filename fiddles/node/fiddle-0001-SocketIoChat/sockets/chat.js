var pseudoArray = ['admin'], //block the admin username (you can disable it)
    users = 0; //count the users


module.exports = function (io) {
    console.log('io base initialized');
    io.on('connection', function (socket) {
        socket.on('begin chat', function(userName) {
            var msg  = '<span style="color: #7FFFD4;">' + userName + '</span> - connected';
            console.log(userName + ' connected');
            io.emit('begin chat', msg);
        });
        socket.on('chat message', function(msg){
            console.log(msg);
            io.emit('chat message', msg);
        });
    });
};
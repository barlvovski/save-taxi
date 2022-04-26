const app = require('./http-server');
const http = require('http');

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server, { cors: { origins: '*:*' } });

const PORT = 3000;

server.listen(PORT, () => console.log(`Listening to port ${PORT}`));

const chats = {};

io.sockets.on('connection', function (socket) {
    console.log('new client connected');
    socket.emit('connection', null);

    socket.on('join', function (chatId) {
        socket.join(chatId);
    });

    socket.on('exitChat', function (chatId) {
        if (chats[chatId]) {
            chats[chatId] = chats[chatId].filter((id) => id !== socket.id);
        } else {
            chats[chatId] = [];
        }
    });

    socket.on('message', function (data) {
        socket.to(data.chatId).emit('message', data);
    });

    // io.sockets.emit('message', { count: count });

    // socket.on('disconnect', function () {
    //     count--;
    //     io.sockets.emit('message', { count: count });
    // });
});

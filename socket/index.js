const { Server } = require('socket.io');

require('dotenv').config();

const io = new Server({ cors: process.env.APP_URL || 'http://localhost:5173' });
const port = process.env.PORT || 3000;
let onlineUsers = [];


io.on('connection', (socket) => {

    socket.on('addNewUser', (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            });
        io.emit('getOnlineUsers', onlineUsers);
    });

    //add message
    socket.on('sendMessage', (message) => {
        const user = onlineUsers.find((user) => user.userId === message.recipientId);

        if (user) {
            io.to(user.socketId).emit('getMessage', message);
            io.to(user.socketId).emit('getNotification', {
                senderId: message.senderId,
                isRead: false,
                date: new Date()
            });
        }
    })

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit('getOnlineUsers', onlineUsers);
    });
});

io.listen(port);
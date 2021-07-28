require('dotenv').config();

const port = process.env.PORT;
const clientPort = process.env.PORT_CLIENT;

const io = require('socket.io')(port, { cors: { origin: clientPort } });

let users = [];
let chat = [];

const addUser = ({ id, userId }) => {
    if (!userId) {
        return ;
    }
    const userExist = users.find((user) => user.userId === userId);
    if (userExist) {
        return ;
    }
    const user = { id, userId };
    users.push(user);
    return user;
}

const removeUser = id => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const joinChat = ({ id, userId, room }) => {
    const foundInRoom = chat.find((c) => c.userId === userId && c.room === room);
    if (foundInRoom)
        return ;

    const userToRoom = { id, userId, room };
    chat.push(userToRoom);
    return userToRoom;
}

const removeChat = id => {
    const index = chat.findIndex((c) => c.id === id);
    if (index !== -1) {
        return chat.splice(index, 1)[0];
    }
}

const getUserInRoom = id => chat.find(user => user.id === id);

io.on('connection', (socket) => {
    //add online users
    socket.on('addUser', ({ userId }) => {
        const user = addUser({ id: socket.id, userId });
        io.emit('getUsers', users);
    });

    //register user to chatroom
    socket.on('join', ({ userId, room }) => {
        const userInRoom = joinChat({ id: socket.id, userId, room });
        userInRoom && socket.join(userInRoom.room);
    })

    //get message from user and send to room
    socket.on('sendMessage', ({chatID, chatMsg, chat_img, senderId }) => {
        const userInRoom = getUserInRoom(socket.id);
        io.to(userInRoom.room).emit('getMessage', { _id: chatID, senderId, chatMsg, chat_img });
    });

    socket.on('disconnect', () => {
        removeUser(socket.id);
        removeChat(socket.id);
    })
})

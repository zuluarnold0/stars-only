const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    senderId: {
        type: String
    },
    chat: {
        type: String,
        trim: true
    },
    chat_img: {
        type: String
    }
},{
    timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
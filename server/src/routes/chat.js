const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

const Chat = require('../models/chat');

router.post("/chats", auth, async (req, res) => {
    try {
        const img = !req.body.chat_img  ? '' : req.body.chat_img;
       
        const newChat = new Chat({
            senderId: req.user._id,
            chat: req.body.chat,
            conversationId: req.body.conversationId,
            chat_img: img
        });

        const savedChat = await newChat.save();
        res.status(200).json({ chat: savedChat });
    }
    catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get("/chats/:conversation_id", auth, async (req, res) => {

    try {
        const chats = await Chat.find({ conversationId: req.params.conversation_id })
        res.status(200).json({ conversation: chats });
    }
    catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

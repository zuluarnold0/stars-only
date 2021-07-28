const express = require("express");
const router = new express.Router();

const auth = require('../middleware/auth');
const Conversation = require('../models/conversation');

router.post("/conversations", async (req, res) => {
  const newConversation = new Conversation({
    members: [ req.body.senderId, req.body.receiverId ]
  })

  try {
    const saved = await newConversation.save();
    res.status(200).json({ conversation: saved });
  }
  catch (e) {
      res.status(500).json({ message: 'Server error' });
  }
});

router.get("/conversations/:user_id", auth, async (req, res) => {

  try {
    const conversations = await Conversation.find({ members: { $in: [ req.params.user_id ] }})
    res.status(200).json({ conversations });
  }
  catch (e) {
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
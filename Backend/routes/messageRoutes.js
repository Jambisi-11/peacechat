
const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// ✅ Get distinct contact IDs with messages
router.get("/with-messages/ids", async (req, res) => {
  try {
    const ids = await Message.distinct("contactId");
    res.json(ids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all messages for a specific contact
router.get("/:contactId", async (req, res) => {
  try {
    const messages = await Message.find({ contactId: req.params.contactId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create a new message
router.post("/", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

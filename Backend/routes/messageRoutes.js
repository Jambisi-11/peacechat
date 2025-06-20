const express = require("express");
const router = express.Router(); // 👈 router is defined here
const Message = require("../models/Message");

// Now it's safe to define routes
router.get("/with-messages/ids", async (req, res) => {
  try {
    const ids = await Message.distinct("contactId");
    res.json(ids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get messages for a contact
router.get("/:contactId", async (req, res) => {
  try {
    const messages = await Message.find({ contactId: req.params.contactId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new message
router.post("/", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const saved = await newMessage.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

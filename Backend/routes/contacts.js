
const express = require("express");
const router = express.Router();
const Contact = require("../models/contacts");

// ✅ POST - Create a new contact
router.post("/", async (req, res) => {
  console.log("📥 Incoming contact data:", req.body); // For debugging

  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    console.error("❌ Failed to save contact:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET - Fetch all contacts for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.params.userId });
    res.status(200).json(contacts);
  } catch (err) {
    console.error("❌ Failed to fetch contacts:", err.message);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

module.exports = router;

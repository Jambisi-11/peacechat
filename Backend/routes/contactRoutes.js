// backend/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');

// POST - create a new contact
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // GET - fetch all contacts (optional, for testing)
// router.get('/', async (req, res) => {
//   try {
//     const contacts = await Contact.find();
//     res.status(200).json(contacts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});


module.exports = router;

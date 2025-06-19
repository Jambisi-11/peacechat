const express = require('express');
const router = express.Router();
const { getContacts, addContact } = require('../controllers/contactController');

// GET all contacts
router.get('/', getContacts);

// POST new contact
router.post('/', addContact);

module.exports = router;

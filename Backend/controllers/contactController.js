const contacts = []; // In-memory storage (you'll replace this with DB later)

const getContacts = (req, res) => {
  res.json(contacts);
};

const addContact = (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newContact = { id: Date.now(), name, phone, email };
  contacts.push(newContact);
  res.status(201).json(newContact);
};

module.exports = { getContacts, addContact };

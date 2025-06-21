

// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password }); // Do NOT hash here
    await user.save();

    res.status(201).json({ message: 'Signup successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Error signing up', error: err.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Signin successful',
      userId: user._id,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({ message: 'Error signing in', error: err.message });
  }
});


// PUT /api/auth/update-avatar
router.put('/update-avatar/:id', async (req, res) => {
  const { profilePic } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profilePic },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Avatar updated", profilePic: user.profilePic });
  } catch (err) {
    res.status(500).json({ message: "Error updating avatar", error: err.message });
  }
});

module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/profilePics'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/:id', upload.single('profilePic'), async (req, res) => {
  try {
    // ✅ Only available inside the route
    const imagePath = `/uploads/profilePics/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profilePic: imagePath },
      { new: true }
    );

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;

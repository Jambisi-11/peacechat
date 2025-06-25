const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phCode, profilePic } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🟢 SIGNUP password:", password);
    console.log("🟢 SIGNUP hashed:", hashedPassword);

    // Create and save user WITH ALL FIELDS
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phCode,
      profilePic,
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful",
      userId: user._id,
      name: user.name,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json({ message: "Error signing up", error: err.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("🔴 User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("👉 Incoming plain password:", password);
    console.log("🔒 Hashed password in DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🟡 Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Signin successful",
      userId: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic || "",
    });
  } catch (err) {
    res.status(500).json({ message: "Error signing in", error: err.message });
  }
});

// PUT /api/auth/update-avatar/:id
router.put("/update-avatar/:id", async (req, res) => {
  const { profilePic } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profilePic },
      { new: true },
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res
      .status(200)
      .json({ message: "Avatar updated", profilePic: user.profilePic });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating avatar", error: err.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (req.body.isAdmin && existingAdmin) {
      return res.status(403).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin || false
    });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    console.log("Login attempt:", req.body.email);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found, comparing password");
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
    console.log("Login successful, token generated");
    res.json({ token, user: { email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

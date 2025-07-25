// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// @route   GET /api/users
// @desc    Get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err); // Pass to error handler
  }
});

// @route   POST /api/users
// @desc    Create new user
router.post("/", async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err); // Pass to error handler
  }
});

// @route   GET /api/users/error (for testing error handler)
router.get("/error", (req, res) => {
  throw new Error("This is a test error!");
});

module.exports = router;

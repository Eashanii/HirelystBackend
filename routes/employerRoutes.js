const express = require("express");
const router = express.Router();
const Employer = require("../models/employer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticateToken = require("../middleware/authMiddleware"); // your JWT middleware

// POST /api/employers — registration route
router.post("/", async (req, res) => {
  try {
    const { companyName, email, contactPerson, phone, industry, companySize, website, password } = req.body;

    // Check if email already exists
    const existingEmployer = await Employer.findOne({ email });
    if (existingEmployer) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employer
    const employer = new Employer({
      companyName,
      email,
      contactPerson,
      phone,
      industry,
      companySize,
      website,
      password: hashedPassword,
    });

    await employer.save();

    // Generate JWT token
    const token = jwt.sign({ id: employer._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "1d" });

    // Send token back
    res.status(201).json({ token });
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/employers/me — protected route to get employer info
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const employer = await Employer.findById(req.userId).select("-password");
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }
    res.json(employer);
  } catch (err) {
    console.error("Error fetching employer:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

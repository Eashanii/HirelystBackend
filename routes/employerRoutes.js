const express = require("express");
const router = express.Router();
const Employer = require("../models/employer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticateToken = require("../middleware/authMiddleware"); // your JWT middleware
const { registerEmployer, loginEmployer } = require("../controllers/employerController");
const { loginAdmin } = require("../controllers/adminController");

// POST /api/employers — registration route
router.post("/registerEmployer", registerEmployer);
router.post("/loginEmployer", loginEmployer);

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

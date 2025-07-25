const Employer = require('../models/employer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerEmployer = async (req, res, next) => {
  try {
    const { companyName, email, password, contactNumber } = req.body;

    // Check if employer already exists
    const existing = await Employer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Employer already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const employer = new Employer({
      companyName,
      email,
      password: hashedPassword,
      contactNumber,
    });

    const savedEmployer = await employer.save();

    // Create JWT token
    const token = jwt.sign(
      { id: savedEmployer._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      employer: {
        companyName: savedEmployer.companyName,
        email: savedEmployer.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerEmployer };


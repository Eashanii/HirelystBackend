
import Employer from '../models/employer.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerEmployer = async (req, res) => {
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
};

export const loginAdmin = async (req, res) => {
  const {email, password}= req.body;
  try{

  const employer = await Employer.findOne({email});

  if(!employer){
    return res.status(400).json({status:"fail", message: "Employer not found"});
  }

  const isPasswordMatch = await bcrypt.compare(password, employer.password);

  if(!isPasswordMatch){
    return res.status(400).json({status:"fail", message: "Wrong Password"});
  }

  res.json({
token: jwt.sign({ id: employer._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "1d" })
  })
  
  }
   catch(err){
    res.status(500).json({messae: `server eror ${err}`})
  }
}



const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  companyName: String,
  email: String,
  contactPerson: String,
  phone: String,
  industry: String,
  companySize: String,
  website: String,
  password: String,
});

module.exports = mongoose.model("Employer", employerSchema);

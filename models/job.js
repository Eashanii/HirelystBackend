const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  location: String,
  qualifications: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Job", jobSchema);

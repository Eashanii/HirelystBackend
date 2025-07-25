const express = require("express");
const router = express.Router();
const Job = require("../models/job");

// POST /api/jobs — Create a new job
router.post("/", async (req, res, next) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    next(err);
  }
});

// GET /api/jobs — Get all jobs
router.get("/", async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("createdBy", "companyName");
    res.json(jobs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

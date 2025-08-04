const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware"); // your JWT middleware
const { loginAdmin } = require("../controllers/adminController");


router.post("/loginAdmin", loginAdmin)

module.exports = router;

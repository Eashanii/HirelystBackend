const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // ✅ using your own connection file

// Load environment variables
dotenv.config();

// Connect to MongoDB using custom function
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const employerRoutes = require("./routes/employerRoutes"); 
const jobRoutes = require("./routes/jobRoutes");

const adminnRoutes = require("./routes/adminRoutes")


app.use("/api/users", userRoutes);
app.use("/api/employers", employerRoutes);
app.use("/api/jobs", jobRoutes);




api.user("/api/admin", adminnRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

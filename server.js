require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Protected Test Route
app.get("/api/test", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
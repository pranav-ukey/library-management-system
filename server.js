require("dotenv").config();

const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const connectDB = require("./config/db")

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

connectDB();

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Library Management System API is running 🚀",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


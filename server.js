require("dotenv").config();

const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db")

const app = express();

//middleware
app.use(cors());
app.use(express.json());

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


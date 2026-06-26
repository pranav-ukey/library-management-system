const express = require("express");

const router = express.Router();

const { addBook } = require("../controllers/bookController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post("/", protect, authorize("librarian"), addBook);

module.exports = router;
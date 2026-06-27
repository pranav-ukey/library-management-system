const express = require("express");

const router = express.Router();

const { getMyBorrowedBooks } = require("../controllers/memberController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get(
  "/my-borrowed-books",
  protect,
  authorize("member"),
  getMyBorrowedBooks
);

module.exports = router;
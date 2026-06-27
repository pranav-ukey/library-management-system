const express = require("express");

const router = express.Router();

const { addBook, getAllBooks, getBookById, updateBook, deleteBook, borrowBook,} = require("../controllers/bookController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post("/", protect, authorize("librarian"), addBook);
router.get("/", protect, getAllBooks);
router.get("/:id", protect, getBookById);
router.put(
  "/:id",
  protect,
  authorize("librarian"),
  updateBook
);

router.delete(
  "/:id",
  protect,
  authorize("librarian"),
  deleteBook
);

router.post(
  "/:id/borrow",
  protect,
  authorize("member"),
  borrowBook
);

module.exports = router;
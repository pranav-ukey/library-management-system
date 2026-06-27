const express = require("express");

const router = express.Router();

const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("../controllers/bookController");

const {
  bookValidation,
  validate,
} = require("../validators/validationRules");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorize("librarian"),
  bookValidation,
  validate,
  addBook
);
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

router.post(
  "/:id/return",
  protect,
  authorize("member"),
  returnBook
);

module.exports = router;
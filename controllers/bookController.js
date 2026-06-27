const Book = require("../models/Book");
const Borrow = require("../models/Borrow");

const addBook = async (req, res) => {
  try {
    const { title, author, isbn, category, quantity } = req.body;

    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "Book with this ISBN already exists",
      });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      quantity,
      availableQuantity: quantity,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, isbn, category, quantity } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.isbn = isbn ?? book.isbn;
    book.category = category ?? book.category;

    // If quantity changes, adjust availableQuantity
    if (quantity !== undefined) {
      const borrowedBooks = book.quantity - book.availableQuantity;

      book.quantity = quantity;
      book.availableQuantity = quantity - borrowedBooks;
    }

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const borrowBook = async (req, res) => {
  try {
    const memberId = req.user.id;
    const bookId = req.params.id;

    // Check if book exists
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check availability
    if (book.availableQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Book is not available",
      });
    }

    
    // Check if member already borrowed this book
    const existingBorrow = await Borrow.findOne({
      memberId,
      bookId,
      status: "borrowed",
    });

    if (existingBorrow) {
      return res.status(400).json({
        success: false,
        message: "You have already borrowed this book",
      });
    }

    // Create borrow record
    const borrow = await Borrow.create({
      memberId,
      bookId,
    });

    // Update available quantity
    book.availableQuantity -= 1;
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const returnBook = async (req, res) => {
  try {
    const memberId = req.user.id;
    const bookId = req.params.id;

    // Check if book exists
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Find active borrow record
    const borrow = await Borrow.findOne({
      memberId,
      bookId,
      status: "borrowed",
    });

    if (!borrow) {
      return res.status(400).json({
        success: false,
        message: "You have not borrowed this book",
      });
    }

    // Mark as returned
    borrow.status = "returned";
    borrow.returnDate = new Date();

    await borrow.save();

    // Increase available quantity
    book.availableQuantity += 1;

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: borrow,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
};
const Book = require("../models/Book");

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

module.exports = {
  addBook,
};
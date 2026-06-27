const Borrow = require("../models/Borrow");

const getMyBorrowedBooks = async (req, res) => {
  try {
    const memberId = req.user.id;

    const borrowedBooks = await Borrow.find({
      memberId,
    }).populate("bookId", "title author isbn category");

    res.status(200).json({
      success: true,
      count: borrowedBooks.length,
      data: borrowedBooks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyBorrowedBooks,
};
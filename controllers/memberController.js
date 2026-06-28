const User = require("../models/User");
const Borrow = require("../models/Borrow");

// Get all members (Librarian)
const getAllMembers = async (req, res) => {
  try {
    const members = await User.find({ role: "member" }).select("-password");

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE a memeber
const deleteMember = async (req, res) => {
  try {
    const member = await User.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    if (member.role !== "member") {
      return res.status(400).json({
        success: false,
        message: "Only member accounts can be deleted",
      });
    }

    await Borrow.deleteMany({
      memberId: member._id,
    });

    await member.deleteOne();

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
  getAllMembers,
  deleteMember,
  getMyBorrowedBooks,
};
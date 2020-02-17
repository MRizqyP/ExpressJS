const db = require("../app/db.js");
const Book = db.book;
const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.buatOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const books = await Book.findOne({
    where: { id: req.body.bookId }
  });
  await user.addBooks(books);
  res.status(201).send({
    user: user,
    books: books,
    status: "order berhasil!"
  });
});

exports.liatsemuaOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: [
          "title",
          "author",
          "pages",
          "published_date",
          "language",
          "published_id"
        ],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "All Order",
    user: user
  });
});

exports.liatOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: [
          "title",
          "author",
          "pages",
          "published_date",
          "language",
          "publisher_id"
        ],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  console.log("tes eror bisa kali");
  res.status(200).json({
    description: "User order page",
    user: user
  });
});

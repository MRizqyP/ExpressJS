const db = require("../app/db.js");
const Book = db.book;
const asyncMiddleware = require("express-async-handler");

exports.tambahBuku = asyncMiddleware(async (req, res) => {
  console.log("Processing func -> Tambah Buku");
  const {
    title,
    author,
    published_date,
    pages,
    language,
    published_id
  } = req.body;
  db.book
    .create({
      title: title,
      author: author,
      published_date: published_date,
      pages: pages,
      language: language,
      published_id: published_id
    })
    .then(book =>
      res.status(201).json({
        error: false,
        data: book,
        message: "Buku baru berhasil di tambahkan."
      })
    )
    .catch(error =>
      res.json({
        error: true,
        data: [],
        error: error
      })
    );
});

exports.rubahBuku = asyncMiddleware(async (req, res) => {
  await Book.update(
    {
      title: req.body.title,
      author: req.body.author,
      published_date: req.body.published_date,
      pages: req.body.pages,
      language: req.body.language,
      published_id: req.body.published_id
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Buku berhasil di update"
  });
});

//show book by id
exports.tampilBuku = asyncMiddleware(async (req, res) => {
  await Book.findOne({
    where: { id: req.params.id },
    attributes: [
      "title",
      "author",
      "pages",
      "published_date",
      "language",
      "publisher_id"
    ]
  });
  res.status(200).json({
    description: "Tampil Buku",
    user: user
  });
});

//show all books
exports.tampilsemuaBuku = asyncMiddleware(async (req, res) => {
  const book = await Book.findAll({
    attributes: [
      "title",
      "author",
      "pages",
      "published_date",
      "language",
      "publisher_id"
    ]
  });
  res.status(200).json({
    description: "Tampil Semua Buku",
    book: book
  });
});

//delete book by id
exports.hapusBuku = asyncMiddleware(async (req, res) => {
  await Book.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "Buku berhasil di delete"
  });
});

exports.order = asyncMiddleware(async (req, res) => {
  // Save order to Database
  console.log("Processing func -> Order");
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const books = await Book.findOne({
    where: { id: req.params.id }
  });
  await user.addBooks(books);
  res.status(201).send({
    status: "order berhasil!"
  });
});

//show all orders
exports.orders = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "pages", "language", "publisher_id"],
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

//find order by user id
exports.getOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "page", "language", "publisher_id"],
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

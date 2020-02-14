const db = require("../app/db.js");
const User = db.user;
const Role = db.role;
const Book = db.book;
const asyncMiddleware = require("express-async-handler");

exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "All User",
    user: user
  });
});
exports.tambahbuku = asyncMiddleware(async (req, res) => {
  // Save User to Database
  console.log("Processing func -> Tambah Buku");
  const {
    id,
    title,
    author,
    published_date,
    pages,
    language,
    published_id
  } = req.body;
  model.book
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

  // const book = await Book.create({
  //   title: req.body.title,
  //   author: req.body.author,
  //   published_date: req.body.published_date,
  //   pages: req.body.pages,
  //   language: req.body.language,
  //   published_id: req.body.published_id
  // });
  // // await book.setUsers(users);
  // res.status(201).send({
  //   status: "Book registered successfully!"
  // });
});
exports.tampilbuku = asyncMiddleware(async (req, res) => {});

exports.userContent = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "User Content Page",
    user: user
  });
});
exports.adminBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Admin Board",
    user: user
  });
});
exports.managementBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Management Board",
    user: user
  });
});

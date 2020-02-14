var model = require("../models/index");
const { check, validationResult } = require("express-validator");

module.exports = function(app) {
  app.get("/books", function(req, res, next) {
    model.book
      .findAll({})
      .then(books =>
        res.json({
          error: false,
          data: books
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
  app.get("/books/:id", function(req, res, next) {
    const book_id = req.params.id;

    model.book
      .findAll({
        where: {
          id: book_id
        }
      })
      .then(books =>
        res.json({
          error: false,
          data: books
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

  app.post(
    "/books",
    [
      check("title")
        .notEmpty()
        .withMessage("Title tidak boleh kosong")
        .isString(),
      check("author")
        .notEmpty()
        .withMessage("Author tidak boleh kosong")
        .isString(),
      check("published_date")
        .isBefore()
        .withMessage("Tanggal tidak mungkin lebih dari tanggal sekarang")
        .notEmpty(),
      check("pages")
        .isNumeric()
        .notEmpty(),
      check("language")
        .isString()
        .notEmpty(),
      check("published_id")
        .isString()
        .notEmpty()
    ],
    function(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
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
    }
  );
  /* update todo. */
  app.put(
    "/books/:id",
    [
      check("title")
        .notEmpty()
        .withMessage("Title tidak boleh kosong")
        .isString(),
      check("author")
        .notEmpty()
        .withMessage("Author tidak boleh kosong")
        .isString(),
      check("published_date")
        .isBefore()
        .withMessage("Tanggal tidak mungkin lebih dari tanggal sekarang")
        .notEmpty(),
      check("pages")
        .isNumeric()
        .notEmpty(),
      check("language")
        .isString()
        .notEmpty(),
      check("published_id")
        .isString()
        .notEmpty()
    ],
    function(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const book_id = req.params.id;
      const {
        title,
        author,
        published_date,
        pages,
        language,
        published_id
      } = req.body;
      model.book
        .update(
          {
            title: title,
            author: author,
            published_date: published_date,
            pages: pages,
            language: language,
            published_id: published_id
          },
          {
            where: {
              id: book_id
            }
          }
        )
        .then(book =>
          res.json({
            error: false,
            message: "Buku berhasil di update."
          })
        )
        .catch(error =>
          res.json({
            error: true,
            error: error
          })
        );
    }
  );
  /* GET todo listing. */
  /* Delete todo. */
  app.delete("/books/:id", function(req, res, next) {
    const book_id = req.params.id;
    model.book
      .destroy({
        where: {
          id: book_id
        }
      })
      .then(status =>
        res.json({
          error: false,
          message: "Buku berhasil di delete."
        })
      )
      .catch(error =>
        res.json({
          error: true,
          error: error
        })
      );
  });
};

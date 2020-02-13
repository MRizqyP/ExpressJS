var model = require("../models/index");

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

  app.post("/books", function(req, res, next) {
    const {
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
  });
  /* update todo. */
  app.put("/books/:id", function(req, res, next) {
    const book_id = req.params.id;
    const { title, description } = req.body;
    model.book
      .update(
        {
          title: title,
          description: description
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
          message: "todo has been updated."
        })
      )
      .catch(error =>
        res.json({
          error: true,
          error: error
        })
      );
  });
  /* GET todo listing. */
  /* Delete todo. */
  app.delete("books/:id", function(req, res, next) {
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
          message: "todo has been delete."
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

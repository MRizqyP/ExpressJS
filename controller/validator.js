const { check, validationResult } = require("express-validator");
const asyncMiddleware = require("express-async-handler");

const bookValidationRules = () => {
  return [
    check("title")
      .notEmpty()
      .withMessage("Title tidak boleh kosong")
      .isString(),
    check("author")
      .notEmpty()
      .withMessage("Author tidak boleh kosong")
      .isString(),
    check("published_date")
      //   .isBefore()
      //   .withMessage("Tanggal tidak mungkin lebih dari tanggal sekarang")
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
  ];
};

const userValidationRules = () => {
  return [
    check("name")
      .notEmpty()
      .isString()
      .withMessage("Nama harus di isi"),
    check("username")
      .notEmpty()
      .isString()
      .withMessage("Username tidak boleh kosong"),
    check("email")
      .notEmpty()
      .isEmail(),
    check("password")
      .isLength({ min: 6 })
      .notEmpty()
    // check("roles")
    //   .notEmpty()
    //   .isString()
    //   .withMessage("hanya user, admin atau pm")
  ];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  bookValidationRules,
  userValidationRules,
  validate
};

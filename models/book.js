'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    published_date: DataTypes.DATE,
    pages: DataTypes.INTEGER,
    language: DataTypes.STRING,
    published_id: DataTypes.STRING
  }, {});
  book.associate = function(models) {
    // associations can be defined here
  };
  return book;
};
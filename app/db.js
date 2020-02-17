//initailize sequelize

const env = require("./env.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  logging: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../model/user.js")(sequelize, Sequelize);
db.role = require("../model/role.js")(sequelize, Sequelize);

db.book = require("../model/book.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.book.belongsToMany(db.user, {
  through: "book_user",
  foreignKey: "bookId",
  otherKey: "userId"
});
db.user.belongsToMany(db.book, {
  through: "book_user",
  foreignKey: "userId",
  otherKey: "bookId"
});
module.exports = db;

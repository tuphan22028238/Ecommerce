const Sequelize = require("sequelize");

const sequelize = new Sequelize("e_shop", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  port: 3307
});
module.exports = sequelize;

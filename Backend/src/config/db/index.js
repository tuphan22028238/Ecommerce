const Sequelize = require("sequelize");

const sequelize = new Sequelize("e_shop", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  //port : YOUR_PORT ; // MySQL mặc định là port 3306, nếu bạn sử dụng port khác thì điền vào
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
module.exports = sequelize;

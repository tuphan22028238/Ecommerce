const Sequelize = require("sequelize");
require("dotenv").config({ path: "Backend/src/.env" });

const sequelize = new Sequelize(
  process.env.DB_NAME || "e_shop",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "123456",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",

    port: process.env.DB_PORT || 3306, // MySQL mặc định là port 3306, nếu bạn sử dụng port khác thì điền vào
    logging: false,
    // query: {
    //   raw: true, // If you want to return raw results
    // },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: "+07:00",
  }
);
console.log(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_HOST,
  process.env.DB_DIALECT,
  process.env.DB_PORT
);
module.exports = sequelize;

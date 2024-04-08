const mysql = require("mysql2/promise");

async function establishConnection() {
  // Creating a connection pool to the MySQL database
  const connection = await mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "e_shop",
    rowsAsArray: true,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  return connection;
}

module.exports = {
  establishConnection,
};

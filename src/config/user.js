const index = require("../config/db/index.js");

async function main() {
  try {
    const connection = await index.establishConnection();

    // Querying the database
    const [rows, fields] = await connection.execute("SELECT * FROM `user`");

    console.log(rows);
    console.log(fields);

    return [rows, fields];
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

async function insert() {
  try {
    const connection = await index.establishConnection();

    let data = {
      username: "username",
      password: "1",
      name: "A1",
      email: "a@gmail.com",
    };
    // Querying the database
    const [result] = await connection.execute(
      "INSERT INTO `user` (username, password, name, email) VALUES (?, ?, ?, ?)",
      [data.username, data.password, data.name, data.email]
    );

    console.log("Data inserted successfully:", result);

    return result;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

main().catch(console.error);
insert().catch(console.error);

module.exports = {
  main,
  insert,
};

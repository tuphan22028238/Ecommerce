const e = require("express");
const index = require("./index.js");

// Checking if data exists in the database
async function checkExists(tableName, condition) {
  try {
    const connection = await index.establishConnection();

    const [rows] = await connection.execute(
      `SELECT * FROM ${tableName} WHERE ${condition}`
    );

    return rows.length > 0;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

// Inserting user data into database
async function insertUser() {
  try {
    const connection = await index.establishConnection();
    // let data = document.getElementById("form").elements;

    let data = {
      username: "username",
      password: "1",
      name: "A1",
      email: "a@gmail.com",
    };

    // Check if data exists
    const existsUser = await checkExists(
      "user",
      `username = '${data.username}'`
    );

    if (existsUser) {
      const [result] = await connection.execute(
        "INSERT INTO `user` (username, password, name, email) VALUES (?, ?, ?, ?)",
        [data.username, data.password, data.name, data.email]
      );
      console.log("Data inserted successfully:", result);
      return result;
    } else {
      console.log("Data already exists");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

// Deleting user data from database
async function deleteUser() {
  try {
    const connection = await index.establishConnection();

    let username = "username";

    // Check if data exists
    const existsUser = await checkExists("user", `username = '${username}'`);

    if (existsUser) {
      const [result] = await connection.execute(
        "DELETE FROM `user` WHERE username = ?",
        [username]
      );

      console.log("Data deleted successfully:", result);
      return result;
    } else {
      console.log("User does not exist");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

// Updating user data in database
async function updateUser() {
  try {
    const connection = await index.establishConnection();

    let data = {
      username: "username",
      password: "2",
      name: "A1",
      email: "B@gmail.com",
    };

    // Check if data exists
    const existsUser = await checkExists(
      "user",
      `username = '${data.username}'`
    );

    if (existsUser) {
      const [result] = await connection.execute(
        "UPDATE `user` SET password = ?, name = ?, email = ? WHERE username = ?",
        [data.password, data.name, data.email, data.username]
      );
      console.log("Data updated successfully:", result);

      return result;
    } else {
      console.log("User does not exist");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

// Setting role for user
async function setRoleUser() {
  try {
    const connection = await index.establishConnection();

    let data = {
      username: "username",
      role: "2",
    };

    // Check if data exists
    const existsUser = await checkExists(
      "user",
      `username = '${data.username}'`
    );
    if (existsUser) {
      const [result] = await connection.execute(
        "UPDATE `user` SET role = ? WHERE username = ?",
        [data.role, data.username]
      );
      console.log("Data updated successfully:", result);

      return result;
    } else {
      console.log("User does not exist");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

insertUser().catch(console.error);
deleteUser().catch(console.error);
updateUser().catch(console.error);
setRoleUser().catch(console.error);

module.exports = {
  insertUser,
  deleteUser,
  updateUser,
  setRoleUser,
};

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone: {
      type: DataTypes.CHAR(12),
      allowNull: true,
    },
    role: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: 1,
      comment: "1 : Customer- 2 : Seller",
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: 1,
      comment: "1: Active- 0 : Inactive",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "user",
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);
// Checking if user exists in database
async function checkExist(username) {
  try {
    // Find the user in the database
    const user = await User.findOne({ where: { username: username } });

    // If user was found, return true
    if (user) {
      return true;
    }

    // If user was not found, return false
    return false;
  } catch (error) {
    console.error("Error checking user existence:", error.message);
    throw error;
  }
}

// Inserting user data into database
async function insertUser(userData) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;

    if (checkExist(userData.username)) {
      const user = await User.create(userData);
      console.log("User inserted successfully:", user.toJSON());
      return user;
    } else {
      console.log("User already exists");
    }
  } catch (error) {
    console.error("Error inserting user:", error.message);
    throw error;
  }
}

// Deleting user data from database
async function deleteUser(username) {
  try {
    const deletedUser = await User.destroy({
      where: { username },
    });

    // If no user was deleted, log a message
    if (deletedUser === 0) {
      console.log("User not found");
    } else {
      console.log("User deleted successfully");
    }

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
}

// Updating user data in database
async function updateUser(username, updates) {
  try {
    const numAffectedRows = await User.update(updates, {
      where: { username },
    });

    if (numAffectedRows === 0) {
      console.log("User not found");
    } else {
      const updatedUsers = await User.findOne({ where: { username } });
      console.log("User updated successfully:", updatedUsers);
    }
    return numAffectedRows;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
}

// Setting role for user
async function setRoleUser(username, role) {
  try {
    const [numAffectedRows] = await User.update(
      { role },
      {
        where: { username },
      }
    );
    if (numAffectedRows === 0) {
      console.log("User not found");
    } else {
      console.log("User role updated successfully");
    }
    return numAffectedRows;
  } catch (error) {
    console.error("Error setting user role:", error.message);
    throw error;
  }
}

// Getting user data from database
async function getUser(username) {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log("User not found");
      return null;
    }
    console.log("User data:", user.toJSON());
    return user.toJSON();
  } catch (error) {
    console.error("Error getting user:", error.message);
    throw error;
  }
}

module.exports = User;

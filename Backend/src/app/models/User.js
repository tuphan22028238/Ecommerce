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

module.exports = User;

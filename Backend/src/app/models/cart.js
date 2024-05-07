const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db/index");

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
    },
    
  },
  {
    sequelize,
    modelName: "carts",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Cart;
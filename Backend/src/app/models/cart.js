const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db/index");

class Cart extends Model { }

Cart.init(
  {
    cartsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "cart_id",
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "quantity",
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "color",
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "discount",
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "size",
    },
  },
  {
    sequelize,
    modelName: "cart",
    timestamps: false,
    freezeTableName: true,
  }
);
module.exports = Cart;
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db/index");
const User = require("./User");
const Product = require("./Product");

class PossesProduct extends Model { }

PossesProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    modelName: "posses_product",
    timestamps: false,
    freezeTableName: true,
  }
);

// Định nghĩa các ràng buộc ngoại khoá
PossesProduct.belongsTo(User, { foreignKey: "userId" });
PossesProduct.belongsTo(Product, { foreignKey: "productId" });

module.exports = PossesProduct;

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db/index");
const User = require("..models/user");
const Product = require("..models/product");

class PossesProduct extends Model {}

PossesProduct.init(
  {
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
    modelName: "possesProduct",
    timestamps: false,
    freezeTableName: true,
  }
);

// Định nghĩa các ràng buộc ngoại khoá
PossesProduct.belongsTo(User, { foreignKey: "userId" });
PossesProduct.belongsTo(Product, { foreignKey: "productId" });

module.exports = PossesProduct;

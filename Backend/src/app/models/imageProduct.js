const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db/index");

class ImageProduct extends Model {}

ImageProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    link: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "image_product",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = ImageProduct;

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db/index");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    quantityPerUnit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Số lượng",
    },
    unitInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitInOrders: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reOrderLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Mức tối thiểu của mặt hàng",
    },
    listColor: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "list_color",
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: "0: Không bán - 1: mới - 2 : bình thường",
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      field: "created_date",
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "id_type",
    },
  },
  {
    sequelize,
    modelName: "product",
    timestamps: false,
    freezeTableName: true,
  }
);

// Inserting a new product
async function insertProduct(productData) {
  try {
    const product = await Product.create(productData);
    console.log("Product was created:", product);
  } catch (error) {
    console.error("Error inserting product:", error);
  }
}

insertProduct({
  name: "Áo thun nam",
  price: 100000,
  description: "Áo thun nam hàng hiệu",
  quantityPerUnit: 1,
  unitInStock: 10,
  unitInOrders: 0,
  reOrderLevel: 5,
  listColor: "Đỏ, Xanh, Vàng",
  status: 1,
  createdDate: new Date(),
  typeId: 1,
});

module.exports = {
  Product,
  insertProduct,
};

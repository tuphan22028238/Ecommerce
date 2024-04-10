const Sequelize = require("sequelize");
const db = require("../config/database");

const Product = db.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(4000),
      allowNull: true,
    },
    quantityPerUnit: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: "quantity_per_unit",
      comment: "số lượng",
    },
    unitInStock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "unit_in_stock",
    },
    unitInOrders: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: "unit_in_orders",
    },
    reOrderLevel: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: "re_order_level",
      comment: "Mức tối thiểu của mặt hàng",
    },
    listColor: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: "list_color",
    },
    status: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: "0: Không bán - 1: mới - 2 : bình thường",
    },
    createdDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      field: "created_date",
    },
    typeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "id_type",
    },
  },
  {
    tableName: "product",
    timestamps: false,
  }
);

module.exports = Product;

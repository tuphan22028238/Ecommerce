const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db/index");

class OrderDetail extends Model {}

OrderDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "số lượng",
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "unit_price",
    },
    color: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_product",
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_orders",
    },
  },
  {
    sequelize,
    modelName: "orderDetail",
    timestamps: false,
    freezeTableName: true,
  }
);

// Định nghĩa các ràng buộc ngoại khoá
OrderDetail.belongsTo(Product, { foreignKey: "productId" });
OrderDetail.belongsTo(Order, { foreignKey: "orderId" });

module.exports = OrderDetail;

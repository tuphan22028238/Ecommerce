const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db/index");
const User = require("./user");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "total_price",
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: "0 : Hết hàng - 1 : báo giá - 2 : hủy - 3: đã bán",
    },
    paymentMode: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "0: Tiền mặt - 1: Chuyển khoản",
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "payment_date",
    },
    shipmentDate: {
      type: DataTypes.TIMESTAMP,
      defaultValue: DataTypes.NOW,
      allowNull: true,
      field: "shipment_date",
    },
    requireDate: {
      type: DataTypes.TIMESTAMP,
      allowNull: true,
      field: "require_date",
    },
    shippedDate: {
      type: DataTypes.TIMESTAMP,
      allowNull: true,
      field: "shipped_date",
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdDate: {
      type: DataTypes.TIMESTAMP,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: "created_date",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_user",
    },
  },
  {
    sequelize,
    modelName: "orders",
    timestamps: false,
    freezeTableName: true,
  }
);

// Định nghĩa khóa ngoại đến bảng user
Order.belongsTo(User, { foreignKey: "userId" });

module.exports = Order;

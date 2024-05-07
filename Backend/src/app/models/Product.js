const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db/index");
class Product extends Model { }

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
            field: "name",
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "price",
        },
        description: {
            type: DataTypes.STRING(4000),
            allowNull: true,
            field: "description",
        },
        quantityPerUnit: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Số lượng",
            field: "quantity_per_unit",
        },
        unitInStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "unit_in_stock",
        },
        unitInOrders: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "unit_in_orders",
        },
        reOrderLevel: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Mức tối thiểu của mặt hàng",
            field: "re_order_level",
        },
        listColor: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: "red",
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
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "id_seller",
        },
    },
    {
        sequelize,
        modelName: "product",
        timestamps: false,
        freezeTableName: true,
    }
);
module.exports = Product;

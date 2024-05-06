const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db/index");

class Carts extends Model { }

Carts.init(
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
        modelName: "cart",
        timestamps: false,
        freezeTableName: true,
    }
);
module.exports = Carts;
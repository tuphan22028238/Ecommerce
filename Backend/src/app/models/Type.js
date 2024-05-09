const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db/index");

class Type extends Model {}

Type.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    gender: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "0: nữ - 1: nam",
    },
    sizeFrom: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "size_from",
    },
    sizeTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "size_to",
    },
  },
  {
    sequelize,
    modelName: "type",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Type;
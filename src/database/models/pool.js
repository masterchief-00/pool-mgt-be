"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pool extends Model {
    static associate(models) {
      Pool.belongsTo(models.User, { foreignKey: "assigned_to" });
    }
  }
  Pool.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      depth: DataTypes.STRING,
      l: DataTypes.STRING,
      w: DataTypes.STRING,
      location: DataTypes.STRING,
      assigned_to: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Pool",
    }
  );
  return Pool;
};

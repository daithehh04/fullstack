"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permission.belongsToMany(models.Role, {
        foreignKey: "permission_id",
        through: "role_permission",
        as: "roles",
      })
      Permission.belongsToMany(models.User, {
        foreignKey: "permission_id",
        through: "user_permission",
        as: "users",
      })
    }
  }
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Permission",
      tableName: "permissions",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Permission
}

"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Phone, {
        foreignKey: "user_id",
        as: "phone",
      })
      User.hasMany(models.Post, {
        foreignKey: "user_id",
        as: "posts",
      })
      User.belongsToMany(models.Course, {
        foreignKey: "user_id",
        through: "user_course",
        as: "courses",
      })
      User.belongsToMany(models.Role, {
        foreignKey: "user_id",
        through: "user_role",
        as: "roles",
      })
      User.belongsToMany(models.Permission, {
        foreignKey: "user_id",
        through: "user_permission",
        as: "permissions",
      })
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: DataTypes.STRING(50),
      email: DataTypes.STRING(50),
      password: DataTypes.STRING(150),
      status: DataTypes.BOOLEAN,
      address: DataTypes.TEXT,
      provider: DataTypes.STRING,
      id_reset: DataTypes.STRING,
      expired_at: DataTypes.DATE(),
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return User
}

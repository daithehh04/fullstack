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
      phone: DataTypes.TEXT,
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

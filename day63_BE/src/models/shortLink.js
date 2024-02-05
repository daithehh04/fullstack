"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class ShortLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShortLink.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      link_origin: DataTypes.STRING,
      link_short: DataTypes.STRING,
      link_id: DataTypes.STRING,
      password: DataTypes.STRING,
      number_access: DataTypes.INTEGER,
      safe_redirect: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ShortLink",
      tableName: "shorten_urls",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return ShortLink
}

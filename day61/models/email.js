"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Email.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
      },
      content: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      time_send: {
        type: DataTypes.DATE(),
      },
      mail_to: {
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: "Email",
      tableName: "emails",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Email
}

"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("role_permission", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "roles",
          },
          key: "id",
        },
        allowNull: false,
      },
      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "permissions",
          },
          key: "id",
        },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE(),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE(),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("role_permission")
  },
}

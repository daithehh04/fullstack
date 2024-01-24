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
    await queryInterface.createTable("user_course", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        allowNull: false,
      },
      course_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "courses",
          },
          key: "id",
        },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE(), //progress auto convert timestamp with timezone
      },
      updated_at: {
        type: Sequelize.DATE(), //progress auto convert timestamp with timezone
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
    await queryInterface.dropTable("user_course")
  },
}

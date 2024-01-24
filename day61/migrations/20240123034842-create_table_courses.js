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
    await queryInterface.createTable("courses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      desc: {
        type: Sequelize.TEXT,
      },
      created_at: {
        type: Sequelize.DATE(), //progress auto convert timestamp with timezone
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE(), //progress auto convert timestamp with timezone
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
    await queryInterface.dropTable("courses")
  },
}

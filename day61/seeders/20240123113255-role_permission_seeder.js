"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "role_permission",
      [
        {
          role_id: 4,
          permission_id: 1,
        },
        {
          role_id: 4,
          permission_id: 2,
        },
        {
          role_id: 4,
          permission_id: 3,
        },
        {
          role_id: 4,
          permission_id: 4,
        },
        {
          role_id: 5,
          permission_id: 1,
        },
        {
          role_id: 5,
          permission_id: 2,
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("role_permission", null, {})
  },
}

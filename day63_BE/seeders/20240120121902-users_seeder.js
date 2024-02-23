"use strict"
const bcrypt = require("bcrypt")
const { faker } = require("@faker-js/faker")
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
    const users = []
    for (let i = 0; i < 1; i++) {
      users.push({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("123456", 10),
        status: faker.datatype.boolean(),
        created_at: faker.date.anytime(),
        updated_at: faker.date.anytime(),
        address: faker.location.streetAddress(),
      })
    }
    await queryInterface.bulkInsert("users", users, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {})
  },
}

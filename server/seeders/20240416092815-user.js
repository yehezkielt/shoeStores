"use strict";

const { hashPassword } = require('../helpers/bcrypt');

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
    const dataUser = require("../data/user.json");
    //    console.log(dataUser);
    dataUser.map((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.password = hashPassword(el.password)
      return el;
    });
    await queryInterface.bulkInsert("Users", dataUser, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Shoes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      image: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        references: {
          model: "Users",
          key: "id",
        },
      },
      CategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        references: {
          model: "Categories",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Shoes");
  },
};

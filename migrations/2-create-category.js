'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      categoryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        // references: {
        //   model: "Posts",
        //   key: "categoryId",
        // },
        type: Sequelize.SMALLINT
      },
      name: {
        type: Sequelize.STRING(20)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};
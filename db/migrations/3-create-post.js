'use strict';

const { HasMany } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false
      },
      categoryId : {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(40),
        allowNull: false
      } ,
      contents:{
        type: Sequelize.TEXT('tiny')
      },
      likes:{
        type: Sequelize.BOOLEAN,
      defaultValue: false
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
    await queryInterface.dropTable('Posts');
  }
};
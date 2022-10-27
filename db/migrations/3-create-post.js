'use strict';

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
        references: {
          model: "Users",
          key: "userId",
        },
        allowNull: false
      },
      categoryId : {
        type: Sequelize.SMALLINT.UNSIGNED,
        references: {
          model: "Categories",
          key: "categoryId",
        },
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(40),
        allowNull: false
      } ,
      contents:{
        type: Sequelize.TEXT('tiny')
      },
      postImg:{
        type: Sequelize.STRING
      },
      likes:{
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
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
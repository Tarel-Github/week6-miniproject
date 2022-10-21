'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.SMALLINT
      },
      nickname: {
        type: Sequelize.STRING(40)
      },
      title:{
      type: Sequelize.STRING(40)
      } ,
      contents:{
        type: Sequelize.TEXT('tiny')
      }, 
      category:{
        type: Sequelize.STRING(40)
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
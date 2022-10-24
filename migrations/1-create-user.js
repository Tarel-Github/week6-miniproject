'use strict';
/** @type {import('sequelize-cli').Migration} */

const env = require('../config.env');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        type: Sequelize.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      profComment: {
        type: Sequelize.STRING,
        defaultValue: env.ROOT + env.PROF_DIR + 'default_comment.png'
      },
      profMypage: {
        type: Sequelize.STRING,
        defaultValue: env.ROOT + env.PROF_DIR + 'default_mypage.png'
      },
      provider: {
        type: Sequelize.STRING(40),
        defaultValue: 'local'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
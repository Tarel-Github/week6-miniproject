'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      likeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT
      },
      postId: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        references: {
          model:"Posts",
          key:"postId",
        },
        onDelete: "cascade",
      },
      userId: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        references: {
          model:"Users",
          key:"userId",
        },
        onDelete: "cascade",
      },
      like: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};
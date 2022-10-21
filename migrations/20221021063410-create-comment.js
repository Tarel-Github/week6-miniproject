'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.SMALLINT
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
      content: {
        type: Sequelize.DataTypes.STRING(40),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};
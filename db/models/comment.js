'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'userId' });
      this.belongsTo(models.Posts, { foreignKey: 'postId', targetKey: 'postId' });
    }
  }
  Comment.init({
    commentId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.SMALLINT.UNSIGNED
    },
    postId: {
      allowNull: false,
      type: DataTypes.SMALLINT.UNSIGNED,
      references: {
        model: "Posts",
        key: "postId",
      },
      onDelete: "cascade",
    },
    userId: {
      allowNull: false,
      type: DataTypes.SMALLINT.UNSIGNED,
      references: {
        model: "Users",
        key: "userId",
      },
      onDelete: "cascade",
    },
    comment: {
      type: DataTypes.STRING(40)
    },
    createdAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comment;
};
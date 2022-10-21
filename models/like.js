'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Like.init({
    likeId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.SMALLINT
    },
    postId: {
      allowNull: false,
      type: DataTypes.SMALLINT,
      references: {
        model: "Posts",
        key: "postId",
      },
      onDelete: "cascade",
    },
    userId: {
      allowNull: false,
      type: DataTypes.SMALLINT,
      references: {
        model: "Users",
        key: "userId",
      },
      onDelete: "cascade",
    },
    like: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users,{
        foreignKey: 'userId'
      });
      this.belongsTo(models.Categories,{
        foreignKey: 'categoryId'
      });
    }
  }
  Post.init({
    postId: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey:true,
      allowNull: false,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.SMALLINT.UNSIGNED,
      references: {
        model: "Users",
        key: "userId",
      },
      allowNull: false,
    },
    categoryId : {
      type:  DataTypes.SMALLINT.UNSIGNED,
      references: {
        model: "Categories",
        key: "categoryId",
      },
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(40),
      allowNull: false, 
    },
    contents: {
      type: DataTypes.TEXT('tiny')
    },
    likes:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE
    }, 
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Post;
};
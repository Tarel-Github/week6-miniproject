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
        targetKey:'userId',
        foreignKey: 'userId'
      });
      this.belongsTo(models.Categories,{
        targetKey:  'categoryId',
        foreignKey: 'categoryId'
      });
      this.hasMany(models.Comments,{
        sourceKey:  'postId',
        foreignKey: 'postId'
      });
      this.belongsTo(models.Likes,{
        targetKey:  'postId',
        foreignKey: 'postId'
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
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
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
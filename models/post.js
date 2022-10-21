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
      // define association here
    }
  }
  Post.init({
    postId: {type: DataTypes.SMALLINT,
          primaryKey:true},
    userId: DataTypes.SMALLINT,
    nickname:DataTypes.STRING(40), 
    title:DataTypes.STRING(40), 
    contents:DataTypes.TEXT('tiny'),
    category:DataTypes.STRING(40),
    likes:{type: DataTypes.BOOLEAN,
      defaultValue: false},
    createdAt:DataTypes.DATE, 
    updatedAt:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
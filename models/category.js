'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.Post, {
      //   as: 'Post',
      //   foreignKey : 'postId'
      // })
    }
  }
  Category.init({
    categoryId: DataTypes.SMALLINT,
    name: DataTypes.STRING(20)
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
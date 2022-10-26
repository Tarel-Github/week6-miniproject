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
      this.hasMany(models.Posts, {
        sourceKey: 'categoryId',
        foreignKey : 'categoryId'
      })
    }
  }
  Category.init({
    categoryId: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey:true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20)
    },
    createdAt: {
      type: DataTypes.DATE
    }, 
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Category;
};
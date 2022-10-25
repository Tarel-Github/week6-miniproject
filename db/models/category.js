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
      this.hasMany(models.Post, {
        sourceKey: 'categoryId',
        foreignKey : 'categoryId'
      })
    }
  }
  Category.init({
<<<<<<< Updated upstream
    categoryId: DataTypes.SMALLINT,
    field: DataTypes.STRING(20)
=======
    categoryId: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey:true,
      allowNull: false,
      autoIncrement: true
    },
    name: DataTypes.STRING(20)
>>>>>>> Stashed changes
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
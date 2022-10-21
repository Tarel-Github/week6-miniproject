'use strict';
const { Model } = require('sequelize');
const { env } = require('../config.env');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      // this.hasMany(models.Post, {
      //   as: 'Post',
      //   foreignKey: 'userId'
      // });
      // this.hasMany(models.Comment, {
      //   as: 'Comment',
      //   foreignKey: 'userId'
      // });
      // this.hasMany(models.Like, {
      //   as: 'Like',
      //   foreignKey: 'userId'
      // });
    }
  }

  User.init({
    userId: {
      type: DataTypes.SMALLINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    profImg: {
      type: DataTypes.STRING,
      defaultValue: env.ROOT + env.PROF_DIR + 'default.png'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};
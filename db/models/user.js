'use strict';
const { Model } = require('sequelize');
const env = require('../../config.env');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      this.hasMany(models.Posts, {
        as: 'Posts',
        foreignKey: 'userId'
      });
      // this.hasMany(models.Comment, {
      //   as: 'Comments',
      //   foreignKey: 'userId'
      // });
      // this.hasMany(models.Like, {
      //   as: 'Likes',
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
    username: {
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
    profComment: {
      type: DataTypes.STRING,
      defaultValue: env.ROOT + env.PROF_DIR + 'default_comment.webp'
    },
    profMypage: {
      type: DataTypes.STRING,
      defaultValue: env.ROOT + env.PROF_DIR + 'default_mypage.webp'
    },
    provider: {
      type: DataTypes.STRING(40),
      defaultValue: 'local'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Users',
  });
  
  return User;
};
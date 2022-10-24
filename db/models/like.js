'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   this.belongsTo(models.User, { foreignKey: 'userId' });
    //   this.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  }
  Like.init(
    {
      LikeId: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
        unique: true, // UNIQUE, 유일한 값만 존재할 수 있음
        type: DataTypes.SMALLINT.UNSIGNED,
      },
      postId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Post',
          key: 'postId',
        },
        onDelete: 'cascade',
      },
      userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
    },
    {
      sequelize,
      modelName: 'Like',
      timestamps: false,
    }
  );
  return Like;
};

const { Sequelize } = require('sequelize');
const env = require('../config.env');

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: 'mysql'
});

module.exports = sequelize;
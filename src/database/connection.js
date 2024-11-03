const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database.config');

console.log('Database Config:', databaseConfig);

const connection = new Sequelize(databaseConfig) 
module.exports = { connection } 
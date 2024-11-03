const { config } = require('dotenv').config()

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE, 
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      require: true
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000 // idle timeout in milliseconds
  }
};
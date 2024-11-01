const { config } = require('dotenv').config()

module.exports = {
  dialect: process.env.DB_DIALECT, //Qual banco de dados está utilizando;
  host: process.env.DB_HOST, //Qual servidor está utilizando;
  username: process.env.DB_USERNAME, //Qual o nome do seu usuário no postgres;
  password: process.env.DB_PASSWORD, //Qual a senha do seu usuário no postgres;
  database: process.env.DB_DATABASE, //Qual o nome do seu database no postgres;
  port: process.env.DB_PORT, //Qual porta do seu postgres (Normalmente é a 5432);
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
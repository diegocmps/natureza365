const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");


const Usuario = connection.define('usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Usuario
const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");


const Endereco = connection.define('enderecos', {
    rua: {
        allowNull: false,
        type: DataTypes.STRING
    },

    numero: {
        allowNull: false,
        type: DataTypes.STRING
    },

    complemento: {
        allowNull: true,
        type: DataTypes.STRING
    },

    bairro: {
        allowNull: false,
        type: DataTypes.STRING
    },

    cidade: {
        allowNull: false,
        type: DataTypes.STRING
    },

    pais: {
        allowNull: false,
        type: DataTypes.STRING
    },

    cep: {
        allowNull: false,
        type: DataTypes.STRING
    }

})

module.exports = Endereco
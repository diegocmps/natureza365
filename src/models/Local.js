const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");


const Local = connection.define('locais', {


    usuario_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nome_local:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cep:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rua:{
        type: DataTypes.STRING,
        allowNull: true
    },
    bairro:{
        type: DataTypes.STRING,
        allowNull: true
    },
    estado:{
        type: DataTypes.STRING,
        allowNull: true
    },
    latitude:{
        type: DataTypes.STRING,
        allowNull: true
    },
    longitude:{
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Local
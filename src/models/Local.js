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
    localidade:{
        type: DataTypes.STRING,
        allowNull: true
    },
    coord_geo:{
        type: DataTypes.STRING,
        allowNull: true
    }

})

module.exports = Local
const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");
const { hash } = require("bcryptjs");


const Usuario = connection.define("usuario", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
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
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

Usuario.beforeSave(async (usuario) => {

    usuario.senha = await hash(usuario.senha, 8)
    return usuario
})

Usuario.beforeUpdate(async (usuario) => {
    if(usuario.changed('senha')){

        usuario.senha = await hash(usuario.senha, 8)
    }
    return usuario
})

module.exports = Usuario
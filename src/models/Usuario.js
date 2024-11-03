const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');
const { hash } = require('bcryptjs');

const Usuario = connection.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        lowercase: true
    },
    sexo: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: DataTypes.DATE
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isLogged: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

Usuario.beforeCreate(async (usuario) => {
    usuario.senha = await hash(usuario.senha.toString(), 8);
    return usuario;
});

Usuario.beforeUpdate(async (usuario) => {
    if (usuario.changed('senha')) {
        usuario.senha = await hash(usuario.senha.toString(), 8);
    } else {
        const existingUser = await Usuario.findByPk(usuario.id);
        usuario.senha = existingUser.senha;
    }
    return usuario;
});

module.exports = Usuario;

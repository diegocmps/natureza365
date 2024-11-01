const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");
const Usuario = require("./Usuario");

const Local = connection.define('locais', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    descricao: {
        type: DataTypes.TEXT
    },

    cep: {
        type: DataTypes.STRING
    },

    rua: {
        type: DataTypes.STRING
    },

    bairro: {
        type: DataTypes.STRING
    },

    cidade: {
        type: DataTypes.STRING
    },

    estado: {
        type: DataTypes.STRING
    },

    latitude: {
        type: DataTypes.FLOAT
    },

    longitude: {
        type: DataTypes.FLOAT
    },

    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

Usuario.hasMany(Local, { foreignKey: 'usuarioId' });
Local.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Local;
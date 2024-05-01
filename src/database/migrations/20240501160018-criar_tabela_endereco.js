'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('enderecos', {

      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      rua: {
        allowNull: false,
        type: Sequelize.STRING
      },

      numero: {
        allowNull: false,
        type: Sequelize.STRING
      },

      complemento: {
        allowNull: true,
        type: Sequelize.STRING
      },

      bairro: {
        allowNull: false,
        type: Sequelize.STRING
      },

      cidade: {
        allowNull: false,
        type: Sequelize.STRING
      },

      pais: {
        allowNull: false,
        type: Sequelize.STRING
      },

      cep: {
        allowNull: false,
        type: Sequelize.STRING
      }

    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('enderecos');

  }
};

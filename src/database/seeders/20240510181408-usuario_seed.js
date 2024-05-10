'use strict';

const Usuario = require('../../models/Usuario');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuarios = [
      {
        nome: 'Joao das Flores',
        sexo: 'masculino',
        cpf: '12345678911',
        endereco: 'Rua das Flores, 52 - Canasvieiras - Florianópolis/SC',
        email: 'joaodasflores@email.com',
        senha: '12345678',
        data_nascimento: '1989-07-26'
      },
      {
        nome: 'Maria das Flores',
        sexo: 'feminino',
        cpf: '98765432198',
        endereco: 'Rua das Flores, 52 - Canasvieiras - Florianópolis/SC',
        email: 'mariadasflores@email.com',
        senha: '12345678',
        data_nascimento: '1989-07-26'
      }
    ]

    for (const usuario of usuarios) {
      await Usuario.create(usuario);
    }
  },

  down: async(queryInterface, Sequelize) => {
    await Usuario.destroy({email: ['joaodasflores@email.com', 'mariadasflores@email.com']});
  }
};


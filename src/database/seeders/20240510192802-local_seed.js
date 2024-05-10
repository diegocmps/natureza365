'use strict';

const Local = require('../../models/Local');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const locais = [
      {
        usuario_id: 1,
        nome_local: 'Trilha da Lagoinha do Leste',
        descricao: 'A Praia da Lagoinha do Leste é um dos paraísos mais preservados do sul de Florianópolis...',
        cep: '88067079',
        localidade: '88067-079, Pântano do Sul, Florianópolis, Região Geográfica Imediata de Florianópolis, Região Geográfica Intermediária de Florianópolis, Santa Catarina, Região Sul, Brasil',
        coord_geo: 'https://www.google.com/maps/search/?api=1&query=-27.7790083,-48.506409',
      }
    ]

    for (const local of locais) {
      await Local.create(local);
    }
  },

  down: async(queryInterface, Sequelize) => {
    await Local.destroy({where: {usuario_id: [1]}});
  }
}


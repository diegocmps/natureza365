'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.addColumn('locais', 'cep',{
  type: Sequelize.STRING,
  allowNull: false
});

  },

  async down (queryInterface, Sequelize) {
await queryInterface.removeColumn('locais', 'cep');

  }
};

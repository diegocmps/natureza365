'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.changeColumn('locais', 'localidade',{
  type: Sequelize.STRING,
  allowNull: true
});

await queryInterface.changeColumn('locais', 'coord_geo',{
  type: Sequelize.STRING,
  allowNull: true
});

  },

  async down (queryInterface, Sequelize) {
await queryInterface.changeColumn('locais', 'localidade',{
  type: Sequelize.STRING,
  allowNull: false
});

await queryInterface.changeColumn('locais', 'coord_geo',{
  type: Sequelize.STRING,
  allowNull: false
})
  }
};

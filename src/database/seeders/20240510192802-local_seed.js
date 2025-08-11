const { QueryInterface, Sequelize } = require("sequelize");
const Local = require("../../models/Local");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Locais", [
      {
        nome: "Praia do Campeche",
        descricao: "Praia famosa por suas águas cristalinas e areia branca.",
        cidade: "Florianópolis",
        estado: "SC",
        latitude: -27.6706,
        longitude: -48.4977,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Parque Estadual da Serra do Tabuleiro",
        descricao: "Maior unidade de conservação de Santa Catarina.",
        cidade: "Palhoça",
        estado: "SC",
        latitude: -27.7182,
        longitude: -48.6646,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Lagoa da Conceição",
        descricao: "Ponto turístico com esportes aquáticos e vida noturna.",
        cidade: "Florianópolis",
        estado: "SC",
        latitude: -27.5836,
        longitude: -48.4522,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Praia Brava",
        descricao: "Praia com ondas fortes, ideal para surf.",
        cidade: "Florianópolis",
        estado: "SC",
        latitude: -27.4352,
        longitude: -48.4367,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Morro da Cruz",
        descricao: "Mirante com vista panorâmica da cidade.",
        cidade: "Florianópolis",
        estado: "SC",
        latitude: -27.5954,
        longitude: -48.5432,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Locais", {
      nome: [
        "Praia do Campeche",
        "Parque Estadual da Serra do Tabuleiro",
        "Lagoa da Conceição",
        "Praia Brava",
        "Morro da Cruz",
      ],
    });
  },
};

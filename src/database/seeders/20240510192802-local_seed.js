
const { QueryInterface, Sequelize } = require("sequelize");
const Local = require('../../models/Local');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Local.bulkCreate([
      {
        nome: 'Trilha Morro das Aranhas',
        descricao: 'Trilha de aproximadamente 45 min de subida, com uma vista para as praias do Santinho, Moçambique e Ingleses',
        cep: '88058-700',
        rua: 'Estrada Ver. Onildo Lemos',
        bairro: 'Ingleses do Rio Vermelho',
        cidade: 'Florianópolis',
        estado: 'SC',
        usuarioId: 1,
        latitude: -27.468279851664402,
        longitude: -48.375781422036475, 
      },
      {

        
        nome: 'Trilha Lagoinha do Leste',
        descricao: 'Praia, costões, lagoa, cachoeira e mata nativa. Esses ingredientes estão todos juntos na Lagoinha do Leste, que esconde seu encanto entre os morros do Sul da Ilha de Santa Catarina.',
        cep: '88135-222',
        rua: 'R. Manoel Pedro Oliveira',
        bairro: 'Pântano do Sul',
        cidade: 'Florianópolis',
        estado: 'SC',
        usuarioId: 2,
        latitude: -27.77896039728563,
        longitude: -48.506183624679764
      },
      {
        nome: 'Trilha Soldados de Sebold',
        descricao: 'Essas espetaculares formações rochosas de arenito botucatu são um verdadeiro tesouro nas encostas da Serra Geral. Com imponentes 90 metros de altura cada, essas rochas se destacam lado a lado, evocando a imagem de quatro soldados alinhados em guarda nas montanhas.',
        cep: '88450-000',
        rua: 'Parque Soldados de Sebold',
        bairro: 'Soldados de Sebold',
        cidade: 'Alfredo Wagner',
        estado: 'SC',
        usuarioId: 3,
        latitude: -27.83782501454029,
        longitude: -49.28194209386551

      
      },
      {    
        nome: 'Trilha Costeira do Zimbros',
        descricao: 'Com início na Praia do Cantinho de Zimbros, a trilha tem dificuldade moderada por causa da longa extensão, e tem uma duração de aproximadamente 6 horas. No caminho, você encontra as seguintes praias: Praia do Cardoso, Praia do Basílio, Praia da Lagoa, Praia do Casqueiro, Praia do Pasto, Praia do Lau/Hermínio, Praia Triste, Praia do Mauri, Praia da Santa e Praia Vermelha.',
        cep: '88215-000',
        rua: 'R. Rio Piratini',
        bairro: 'Zimbros',
        cidade: 'Bombinhas',
        estado: 'SC',
        usuarioId: 4,
        latitude: -27.181949145957496,
        longitude: -48.54178575940444
      },
      {  
        nome: 'Pico do Cambirela',
        descricao: 'A Trilha do Cambirela é uma das trilhas que mais atrai os aventureiros da região. É uma trilha cansativa e considerada muito difícil de ser percorrida devido ao nível de preparo físico necessário. O Morro do Cambirela (922 m) é uma montanha situada no maciço do mesmo nome e fica localizado no Município de Palhoça, próximo de Florianópolis. Está situado na Serra do Tabuleiro e está dentro do território do Parque Estadual da Serra do Tabuleiro(PEST)',
        cep: '88138-788',
        rua: 'BR-101, Km 222',
        bairro: 'Enseada do Brito',
        cidade: 'Palhoça',
        estado: 'SC',
        usuarioId: 4,
        latitude: -27.710134784512377,
        longitude: -48.65071782742521
      },
      {    
        nome: 'Trilha de Naufragados',
        descricao: 'A Praia de Naufragados, no extremos sul da Ilha, é uma praia isolada com acesso apenas por trilha ou por barco. A trilha mais usada para chegar lá, sai da Caieira da Barra do Sul (no extremo sul do Ribeirão da Ilha), é um caminho fácil, aberto e super conhecido. Mas pouca gente sabe que também dá para chegar na Praia de Naufragados a partir da Praia da Solidão.',
        cep: '88064-002',
        rua: 'Rod. Baldicero Filomeno, 20409',
        bairro: 'Caieira',
        cidade: 'Florianópolis',
        estado: 'SC',
        usuarioId: 4,
        latitude: -27.816341955118446,
        longitude: -48.56085523453938, 
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('locais', null, {});
  }
};

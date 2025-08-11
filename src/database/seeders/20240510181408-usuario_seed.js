const bcrypt = require("bcryptjs");
const Usuario = require("../../models/Usuario");

module.exports = {
  up: async (QueryInterface, Sequelize) => {
    const saltRounds = 10;

    await Usuario.bulkCreate([
      {
        nome: "Raphaela Assis",
        email: "rapha.exemplo@hotmail.com",
        cpf: "01236523879",
        sexo: "Feminino",
        senha: await bcrypt.hash("rapha123", saltRounds),
        data_nascimento: "1989-01-05",
        cep: "88130-000",
        rua: "Rua A",
        numero: 123,
        complemento: "Apto 1",
        bairro: "Campeche",
        cidade: "Florianópolis",
        estado: "SC",
      },
      {
        nome: "Kauana Araujo",
        email: "kaka.exemplo@hotmail.com",
        cpf: "14151917987",
        sexo: "Feminino",
        senha: await bcrypt.hash("kaka123", saltRounds),
        data_nascimento: "2002-12-09",
        cep: "88060-000",
        rua: "Rua B",
        numero: 456,
        complemento: "Casa",
        bairro: "Ratones",
        cidade: "Florianópolis",
        estado: "SC",
      },
      {
        nome: "Tiago Araujo",
        email: "tiago.exemplo@hotmail.com",
        cpf: "78945632115",
        sexo: "Masculino",
        senha: await bcrypt.hash("tiago123", saltRounds),
        data_nascimento: "1992-05-10",
        cep: "88120-000",
        rua: "Rua C",
        numero: 789,
        complemento: "",
        bairro: "Arambaré",
        cidade: "Florianópolis",
        estado: "SC",
      },
      {
        nome: "Maria Eduarda",
        email: "duda.exemplo@hotmail.com",
        cpf: "52687413699",
        sexo: "Feminino",
        senha: await bcrypt.hash("duda123", saltRounds),
        data_nascimento: "2002-09-19",
        cep: "88110-000",
        rua: "Rua D",
        numero: 321,
        complemento: "Bloco B",
        bairro: "Camaquã",
        cidade: "Florianópolis",
        estado: "SC",
      },
      {
        nome: "Mario Alberto",
        email: "mario.exemplo@hotmail.com",
        cpf: "52687413698",
        sexo: "Masculino",
        senha: await bcrypt.hash("mario123", saltRounds),
        data_nascimento: "2002-09-19",
        cep: "88110-000",
        rua: "Rua D",
        numero: 321,
        complemento: "Bloco B",
        bairro: "Camaquã",
        cidade: "Florianópolis",
        estado: "SC",
      },
    ]);
  },

  down: async (QueryInterface, Sequelize) => {
    await Usuario.destroy({
      where: {
        email: [
          "rapha.exemplo@hotmail.com",
          "kaka.exemplo@hotmail.com",
          "tiago.exemplo@hotmail.com",
          "duda.exemplo@hotmail.com",
          "mario.exemplo@hotmail.com",
        ],
      },
    });
  },
};

//teste

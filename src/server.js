const express = require('express');
const cors = require('cors');
const { connection } = require('./database/connection');
const route = require('./routes/routes');



const PORT_API = process.env.PORT_API || 3000;


class Server {

  constructor(server = express()) {

    this.middlewares(server);
    this.database();
    this.initializeServer(server);
    server.use(route)

  }

  async middlewares(app) {
    app.use(cors());
    app.use(express.json());
  }

  async database() {
    try {
      await connection.authenticate();
      console.log('Conexão bem sucedida!');
    } catch (error) {
      console.error('Não foi possível conectar no banco de dados.', error);
      console.log('Configuração do banco de dados:', databaseConfig); // Log da configuração
      throw error;
    }
  }

  async initializeServer(app) {
    app.listen(PORT_API, () => {
      console.log(`Servidor executando na porta ${PORT_API}`);
      console.log('Aguardando requisições...');
    });
  }
  


}

module.exports = { Server };
const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Natureza365',
        description: 'Projeto Natureza365',
        version: "2.0.0"
    },
    host: 'localhost:3000',
    security: [{"apiKeyAuth": []}],
    securityDefinitions: {
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header', // can be 'header', 'query' or 'cookie'
          name: 'authorization', // name of the header, query parameter or cookie
          description: 'Token de Autenticação'
        }
      }
    
}

const outputFile = './src/routes/swagger.json'
const routes = ['./src/server.js']

swaggerAutogen(outputFile, routes, doc)
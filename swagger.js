const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Natureza365',
        description: 'Projeto Natureza365',
        version: "2.0.0"
    },
    host: 'localhost:3000'
}

const outputFile = './src/routes/swagger.json'
const routes = ['./src/server.js']

swaggerAutogen(outputFile, routes, doc)
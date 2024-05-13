const { Router } = require("express");
const usuarioRoutes = require("./usuario.route");
const localRoutes = require("./local.route");
const loginRoutes = require("./login.route");


const routes = Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
routes.use('/usuario', usuarioRoutes)
routes.use('/local', localRoutes)
routes.use('/login', loginRoutes)

module.exports = routes



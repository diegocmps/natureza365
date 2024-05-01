const { Router } = require("express");
const usuarioRoutes = require("./usuario.route");
const localRoutes = require("./local.route");
const enderecoRoutes = require("./endereco.route");

const routes = Router()

routes.use('/usuario', usuarioRoutes)
routes.use('/local', localRoutes)
routes.use('/endereco', enderecoRoutes)

module.exports = routes
const { Router } = require("express");
const usuarioRoutes = require("./usuario.route");
const localRoutes = require("./local.route");
const enderecoRoutes = require("./endereco.route");
const loginRoutes = require("./login.route");

const routes = Router()

routes.use('/usuario', usuarioRoutes)
routes.use('/local', localRoutes)
routes.use('/endereco', enderecoRoutes)
routes.use('/login', loginRoutes)

module.exports = routes
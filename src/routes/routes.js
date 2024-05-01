const { Router } = require("express");
const usuarioRoutes = require("./usuario.route");
const localRoutes = require("./local.route");

const routes = Router()

routes.use('/usuario', usuarioRoutes)
routes.use('/local', localRoutes)

module.exports = routes
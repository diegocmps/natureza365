const { Router } = require("express");
const usuarioRoutes = require("./usuario.route");

const routes = Router()

routes.use('/usuario', usuarioRoutes)

module.exports = routes
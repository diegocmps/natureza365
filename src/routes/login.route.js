const { Router } = require("express");
const LoginController = require("../controllers/LoginController");
const { auth } = require("../middleware/auth");


const loginRoutes = new Router()

loginRoutes.post('/', LoginController.login)
loginRoutes.post('/logout', auth, LoginController.logout)

module.exports = loginRoutes
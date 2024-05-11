const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const Yup = require('yup');
const { auth } = require("../middleware/auth");
const validarUsuario = require("../middleware/validarUsuario");
const usuarioSchema = require("../schemas/usuarioSchema");


const usuarioRoutes = Router()


usuarioRoutes.post('/', validarUsuario(usuarioSchema), UsuarioController.cadastrar)
usuarioRoutes.put('/:id', auth, validarUsuario(usuarioSchema), UsuarioController.atualizar)
usuarioRoutes.delete('/:id', auth, UsuarioController.deletar)

module.exports = usuarioRoutes



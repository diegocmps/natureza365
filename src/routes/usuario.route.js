const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const Yup = require('yup');
const usuarioSchema = require("../services/usuarioSchema");
const validarUsuario = require("../services/validarUsuario");
const atualizarUsuario = require("../services/atualizarUsuario");
const { auth } = require("../middleware/auth");





const usuarioRoutes = Router()


usuarioRoutes.get('/', auth, UsuarioController.listar)
usuarioRoutes.post('/', validarUsuario(usuarioSchema), UsuarioController.cadastrar)
usuarioRoutes.put('/:id', auth, atualizarUsuario(usuarioSchema), UsuarioController.atualizar)
usuarioRoutes.delete('/:id', auth, UsuarioController.deletar)



module.exports = usuarioRoutes
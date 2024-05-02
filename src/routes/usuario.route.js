const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const Yup = require('yup');
const usuarioSchema = require("../services/usuarioSchema");
const validarUsuario = require("../services/validarUsuario");
const atualizarUsuario = require("../services/atualizarUsuario");




const usuarioRoutes = Router()


usuarioRoutes.get('/', UsuarioController.listar)
usuarioRoutes.post('/', validarUsuario(usuarioSchema), UsuarioController.cadastrar)
usuarioRoutes.put('/:id',atualizarUsuario(usuarioSchema), UsuarioController.atualizar)
usuarioRoutes.delete('/:id', UsuarioController.deletar)



module.exports = usuarioRoutes
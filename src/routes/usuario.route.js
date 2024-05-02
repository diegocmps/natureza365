const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const Yup = require('yup');
const usuarioSchema = require("../services/usuarioSchema");
const validarUsuario = require("../services/validarUsuario");




const usuarioRoutes = Router()


usuarioRoutes.get('/', UsuarioController.listar)
usuarioRoutes.post('/', validarUsuario(usuarioSchema), UsuarioController.cadastrar)
usuarioRoutes.put('/:id', UsuarioController.atualizar)
usuarioRoutes.delete('/:id', UsuarioController.deletar)



module.exports = usuarioRoutes
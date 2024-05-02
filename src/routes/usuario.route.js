const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const Yup = require('yup');
const validarValor = require("../services/validarYup");
const usuarioSchema = require("../services/usuarioSchema");




const usuarioRoutes = Router()


usuarioRoutes.get('/', UsuarioController.listar)
usuarioRoutes.post('/', validarValor(usuarioSchema), UsuarioController.cadastrar)
usuarioRoutes.put('/:id', UsuarioController.atualizar)
usuarioRoutes.delete('/:id', UsuarioController.deletar)



module.exports = usuarioRoutes
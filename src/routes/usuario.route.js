const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const usuarioRoutes = Router()


usuarioRoutes.get('/', UsuarioController.listar)
usuarioRoutes.post('/', UsuarioController.cadastrar)
usuarioRoutes.put('/:id', UsuarioController.atualizar)
usuarioRoutes.delete('/:id', UsuarioController.deletar)



module.exports = usuarioRoutes
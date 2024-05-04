const { Router } = require("express");
const LocalController = require("../controllers/LocalController");
const validarLocal = require("../services/validarLocal");
const localSchema = require("../services/localSchema");
const { auth } = require("../middleware/auth");

const localRoutes = Router()

localRoutes.get('/', LocalController.listaMestra)
localRoutes.get('/:usuario_id', auth, LocalController.listar)
localRoutes.get('/:usuario_id/:local_id', auth, LocalController.listarUm)
localRoutes.post('/', validarLocal(localSchema), LocalController.cadastrar)
localRoutes.put('/:id', LocalController.atualizar)
localRoutes.delete('/:id', LocalController.deletar)

module.exports =  localRoutes
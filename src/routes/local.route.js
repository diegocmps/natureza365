const { Router } = require("express");
const LocalController = require("../controllers/LocalController");
const validarLocal = require("../services/validarLocal");
const localSchema = require("../services/localSchema");
const { auth } = require("../middleware/auth");

const localRoutes = Router()

localRoutes.get('/:local_id/maps', LocalController.listarGmaps)
localRoutes.get('/:usuario_id', auth, LocalController.listar)
localRoutes.get('/:usuario_id/:local_id', auth, LocalController.listarUm)
localRoutes.post('/', validarLocal(localSchema), LocalController.cadastrar)
localRoutes.put('/:usuario_id/:id', auth, LocalController.atualizar)
localRoutes.delete('/:usuario_id/:id', auth, LocalController.deletar)

module.exports =  localRoutes
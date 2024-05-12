const { Router } = require("express");
const LocalController = require("../controllers/LocalController");
const { auth } = require("../middleware/auth");
const validarLocal = require("../middleware/validarLocal");
const localSchema = require("../schemas/localSchema");

const localRoutes = Router()

localRoutes.post('/', validarLocal(localSchema), auth, LocalController.cadastrar)
localRoutes.put('/:usuario_id/:id', validarLocal(localSchema), auth, LocalController.atualizar)
localRoutes.delete('/:usuario_id/:id', auth, LocalController.deletar)

localRoutes.get('/:local_id/maps', auth, LocalController.listarGmaps)
localRoutes.get('/:usuario_id', auth, LocalController.listar)
localRoutes.get('/:usuario_id/:local_id', auth, LocalController.listarUm)


module.exports =  localRoutes
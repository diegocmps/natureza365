const { Router } = require("express");
const LocalController = require("../controllers/LocalController");
const validarLocal = require("../services/validarLocal");
const localSchema = require("../services/localSchema");


const localRoutes = Router()

localRoutes.get('/', LocalController.listar)
localRoutes.post('/',validarLocal(localSchema), LocalController.cadastrar)
localRoutes.put('/:id', LocalController.atualizar)
localRoutes.delete('/:id', LocalController.deletar)

module.exports =  localRoutes
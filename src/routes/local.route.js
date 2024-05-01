const { Router } = require("express");
const LocalController = require("../controllers/LocalController");


const localRoutes = Router()

localRoutes.get('/', LocalController.listar)
localRoutes.post('/', LocalController.cadastrar)
localRoutes.put('/:id', LocalController.atualizar)
localRoutes.delete('/:id',)

module.exports =  localRoutes
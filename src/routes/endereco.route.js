const { Router } = require("express");
const EnderecoController = require("../controllers/EnderecoController");

const enderecoRoutes = Router()

enderecoRoutes.get('/', EnderecoController.listar)
enderecoRoutes.post('/', EnderecoController.cadastrar)
enderecoRoutes.put('/:id', EnderecoController.atualizar)
enderecoRoutes.delete('/:id', EnderecoController.deletar)

module.exports = enderecoRoutes
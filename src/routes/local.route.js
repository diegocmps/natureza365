const { Router } = require("express");
const { auth } = require("../middleware/auth");
const LocalController = require("../controllers/LocalController");

const localRoutes = Router();

localRoutes.post('/', auth, LocalController.adicionarLocal);
localRoutes.get('/', LocalController.listarTodosOsLocais);
localRoutes.get('/local', LocalController.listarLocaisPorUsuario);
localRoutes.get('/:localId', auth, LocalController.exibirLocal);
localRoutes.delete('/:localId', auth, LocalController.deletarLocal);
localRoutes.put('/:localId', auth, LocalController.atualizarLocal);




module.exports = localRoutes;
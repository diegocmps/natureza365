const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const { auth } = require('../middleware/auth');

const usuarioRoutes = Router();


usuarioRoutes.post('/', UsuarioController.cadastrar);  
usuarioRoutes.get('/:id', auth, UsuarioController.buscarPorId); 
usuarioRoutes.get('/', auth, UsuarioController.buscarTodos);  
usuarioRoutes.delete('/:id', auth, UsuarioController.excluir); 
usuarioRoutes.put('/:id', auth, UsuarioController.editar);



module.exports = usuarioRoutes;
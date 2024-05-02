const Yup = require('yup');
const Local = require('../models/Local');
const Usuario = require('../models/Usuario');

function validarLocal(esquema){
    return async function (req, res, next){
        const { usuario_id } = req.body;

        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        esquema.validate(req.body)
        .then(()=> next())
        .catch(error =>{
            let status = 400;
            switch (true){
                case error.message.includes('ID válida'):
                    status = 404;
                    break;
                default:
                    status = 400
            }
            return res.status(status).json({error: error.message})
        })
    }
}

module.exports = validarLocal;

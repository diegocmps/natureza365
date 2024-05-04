const Yup = require('yup');
const Usuario = require('../models/Usuario');

function validarUsuario(esquema) {
    return function (req, res, next) {

        if (!req.body.cpf || !req.body.email) {
            return res.status(400).json({ error: 'CPF e e-mail são obrigatórios.' });
        }

        Usuario.findOne({ where: { cpf: req.body.cpf } })
        .then(usuario => {
            if (usuario) {
                return res.status(409).json({ error: 'CPF já cadastrado.' });
            }

            return Usuario.findOne({ where: { email: req.body.email } });
        })
        .then(usuario => {
            if (usuario) {
                return res.status(409).json({ error: 'E-mail já cadastrado.' });
            }

            return esquema.validate(req.body);
        })
        .then(() => {
            next();
        })
        .catch(error => {
            let status = 400;
            switch (true) {
                case error.message.includes('deve ser apenas'):
                    status = 422;
                    break;
                case error.message.includes('deve conter'):
                    status = 409;
                    break;
                case error.message.includes('deve ser uma ID válida'):
                    status = 404;
                    break;
                default:
                    status = 400;
            }
            res.status(status).json({ error: error.message });
        });
    }
}

module.exports = validarUsuario;

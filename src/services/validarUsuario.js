const Yup = require('yup');
const Usuario = require('../models/Usuario');
const Endereco = require('../models/Endereco');


function validarUsuario(esquema) {
    return function (req, res, next) {

        Endereco.findByPk(req.body.endereco_id)
            .then(endereco => {
                if (!endereco) {
                    return res.status(404).json({ error: 'Endereço não encontrado.' });
                }

                Usuario.findOne({ where: { cpf: req.body.cpf } })
                    .then(usuario => {
                        if (usuario) {
                            return res.status(409).json({ error: 'CPF já cadastrado.' });
                        }

                        Usuario.findOne({ where: { email: req.body.email } })
                            .then(usuario => {
                                if (usuario) {
                                    return res.status(409).json({ error: 'E-mail já cadastrado.' });
                                }

                                esquema.validate(req.body)
                                    .then(() => next())
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
                            });
                    });
            })
            .catch(error => {
                res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação.' });
            });
    }
}

module.exports = validarUsuario


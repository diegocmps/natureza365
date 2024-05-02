const Endereco = require("../models/Endereco");
const Usuario = require("../models/Usuario");
const Yup = require('yup')


function atualizarUsuario(esquema) {
    return function (req, res, next) {

        Endereco.findByPk(req.body.endereco_id)
            .then(endereco => {
                if (!endereco) {
                    return res.status(404).json({ error: 'Endereço não encontrado.' });
                }

                Usuario.findByPk(req.params.id)
                    .then(usuario => {
                        if (!usuario) {
                            return res.status(404).json({ error: 'Usuário não encontrado.' });
                        }

                        const promises = [];

                        if (req.body.cpf && usuario.cpf !== req.body.cpf) {
                            promises.push(Usuario.findOne({ where: { cpf: req.body.cpf } }));
                        }

                        if (req.body.email && usuario.email !== req.body.email) {
                            promises.push(Usuario.findOne({ where: { email: req.body.email } }));
                        }

                        return Promise.all(promises)
                            .then(([cpfUsuario, emailUsuario]) => {
                                if (cpfUsuario) {
                                    return res.status(409).json({ error: 'CPF já cadastrado.' });
                                }

                                if (emailUsuario) {
                                    return res.status(409).json({ error: 'E-mail já cadastrado.' });
                                }

                                return esquema.validate(req.body);
                            })
                            .then(() => {
                                usuario.update(req.body)
                                    .then(() => {
                                        res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
                                    })
                                    .catch(error => {
                                        res.status(500).json({ error: 'Ocorreu um erro ao atualizar o usuário.' });
                                    });
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
                    });
            })
            .catch(error => {
                res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação.' });
            });
    }
}

module.exports = atualizarUsuario

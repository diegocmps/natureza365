
const Usuario = require("../models/Usuario");
const Yup = require('yup')


function atualizarUsuario(esquema) {
    return function (req, res, next) {
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
                        }
                        res.status(status).json({ error: error.message });
                    });
            });
    }
}


module.exports = atualizarUsuario

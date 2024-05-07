const Yup = require('yup');

function validarUsuario(esquema) {
    return function (req, res, next) {
        esquema.validate(req.body)
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

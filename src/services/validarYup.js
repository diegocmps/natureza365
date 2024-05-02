const Yup = require('yup')


function validarValor(esquema) {
    return function (req, res, next) {
        esquema.validate(req.body)
            .then(() => next())
            .catch(error => res.status(400).json({ error: error.message }))
    }
}

module.exports = validarValor
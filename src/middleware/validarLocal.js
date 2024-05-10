const Yup = require('yup');
const Local = require('../models/Local');
const Usuario = require('../models/Usuario');

function validarLocal(esquema){
    return async function (req, res, next){

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

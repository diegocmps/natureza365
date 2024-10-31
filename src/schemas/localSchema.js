const Yup = require('yup')

const localSchema = Yup.object().shape({
    
    // usuarioId: Yup.number()
    // .integer('O usuário precisa ter uma ID válida.')
    // .required('A ID é obrigatória.'),

    nome: Yup.string()
    .required('O nome do local é obrigatório'),

    cep: Yup.string()
    .matches(/^\d{8}$/, 'CEP deve ter exatamente 8 dígitos.')
    .required('O CEP é obrigatório'),

    descricao: Yup.string()
    .required('A descrição é obrigatória.'),


})

module.exports = localSchema
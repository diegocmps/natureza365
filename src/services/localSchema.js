const Yup = require('yup')

const localSchema = Yup.object().shape({
    
    usuario_id: Yup.number()
    .integer('O usuário deve ser uma ID válida.')
    .required('A ID é obrigatória.'),

    nome_local: Yup.string()
    .required('O nome do local é obrigatório'),

    localidade: Yup.string()
    .required('A localidade é obrigatória.'),

    descricao: Yup.string()
    .required('A descrição é obrigatória.'),

    coord_geo: Yup.string()
    .required('A coordenada é obrigatória.')

})

module.exports = localSchema
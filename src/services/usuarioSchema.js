const Yup = require('yup')

const usuarioSchema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório.'),
    sexo: Yup.string().required('O sexo é obrigatório.'),
    cpf: Yup.string().required('O cpf é obrigatório.'),
    endereco_id: Yup.string().required('O endereço é obrigatório.'),
    email: Yup.string().required('O e-mail é obrigatório.'),
    senha: Yup.string().required('A senha é obrigatória.'),
    data_nascimento: Yup.string().required('A data de nascimento é obrigatória.')
})

module.exports = usuarioSchema
const Yup = require('yup')

const usuarioSchema = Yup.object().shape({
    nome: Yup.string()
    .matches(/^[a-zA-Z\u00C0-\u017F\s]*$/, 'O nome deve ser apenas com letras.')
    .test('nome-sobrenome', 'O nome deve conter um nome e sobrenome.', (value) => {
        return value && value.trim().split(/\s+/).length > 1;
    })
    .required('O nome é obrigatório.'),

    sexo: Yup.string()
    .required('O sexo é obrigatório.')
    .oneOf(['feminino', 'masculino', 'outros'], 'O sexo deve ser apenas feminino, masculino ou outros.'),

    cpf: Yup.string()
    .matches(/^\d{11}$/, 'O CPF deve estar no formato correto.')
    .required('O cpf é obrigatório.'),

    endereco: Yup.string()
    .required('O endereço é obrigatório.'),

    email: Yup.string()
    .email('O e-mail deve conter um formato válido: example@email.com')
    .required('O e-mail é obrigatório.'),

    senha: Yup.string().required('A senha é obrigatória.'),

    data_nascimento: Yup.string()
    .matches(/^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'A data de nascimento deve estar no formato correto: aaaa-mm-dd.')
    .required('A data de nascimento é obrigatória.')

})

module.exports = usuarioSchema
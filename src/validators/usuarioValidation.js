// validators/usuarioValidation.js

const Yup = require('yup');

const usuarioSchema = Yup.object().shape({
    nome: Yup.string()
        .trim()
        .matches(/\s/, 'O nome deve incluir Nome e Sobrenome.')
        .required('O nome é obrigatório'),
    email: Yup.string()
        .email('Email inválido')
        .required('O email é obrigatório'),
    cpf: Yup.string()
        .length(11, 'O CPF deve conter 11 dígitos')
        .matches(/^\d+$/, 'O CPF deve conter apenas números')
        .required('O CPF é obrigatório'),
    sexo: Yup.string()
        .oneOf(['masculino', 'feminino'], 'Favor preencher o campo sexo com "masculino" ou "feminino"')
        .required('Favor preencher o campo sexo'),
    senha: Yup.string()
        .required('A senha é obrigatória'),
    data_nascimento: Yup.string()
        .matches(/\d{4}-\d{2}-\d{2}/, 'A data de nascimento não está no formato correto')
        .required('A data de nascimento é obrigatória'),
    cep: Yup.string()
        .length(8, 'O CEP deve conter 8 dígitos')
        .matches(/^\d+$/, 'O CEP deve conter apenas números')
        .required('O CEP é obrigatório'),
    numero: Yup.string()
        .required('O número do endereço é obrigatório'),
    rua: Yup.string().required('A rua é obrigatória'),
    bairro: Yup.string().required('O bairro é obrigatório'),
    cidade: Yup.string().required('A cidade é obrigatória'),
    estado: Yup.string().required('O estado é obrigatório'),
});


const usuarioUpdateSchema = Yup.object().shape({
    nome: Yup.string()
        .trim()
        .matches(/\s/, 'O nome deve incluir Nome e Sobrenome.')
        .notRequired(),
    email: Yup.string()
        .email('Email inválido')
        .notRequired(),
    cpf: Yup.string()
        .length(11, 'O CPF deve conter 11 dígitos')
        .matches(/^\d+$/, 'O CPF deve conter apenas números')
        .notRequired(),
    sexo: Yup.string()
        .oneOf(['masculino', 'feminino'], 'Favor preencher o campo sexo com "masculino" ou "feminino"')
        .notRequired(),
    senha: Yup.string().notRequired(),
    data_nascimento: Yup.string()
        .matches(/\d{4}-\d{2}-\d{2}/, 'A data de nascimento não está no formato correto')
        .notRequired(),
    cep: Yup.string()
        .length(8, 'O CEP deve conter 8 dígitos')
        .matches(/^\d+$/, 'O CEP deve conter apenas números')
        .notRequired(),
    numero: Yup.string().notRequired(),
    rua: Yup.string().notRequired(),
    bairro: Yup.string().notRequired(),
    cidade: Yup.string().notRequired(),
    estado: Yup.string().notRequired(),
});

module.exports = { usuarioSchema, usuarioUpdateSchema };

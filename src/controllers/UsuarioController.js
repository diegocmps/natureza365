const Usuario = require("../models/Usuario");

class UsuarioController {

    async listar(req, res) {
        const usuario = await Usuario.findAll()
        res.json(usuario)
    }

    async cadastrar(req, res) {

        try {

            const { nome } = req.body
            const { sexo } = req.body
            const { cpf } = req.body
            const { endereco } = req.body
            const { email } = req.body
            const { senha } = req.body
            const { data_nascimento } = req.body
    
            const usuario = await Usuario.create({
                nome: nome,
                sexo: sexo,
                cpf: cpf,
                endereco: endereco,
                email: email,
                senha: senha,
                data_nascimento: data_nascimento
            })
    
            res.status(201).json(usuario)
            
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não possível cadastrar o aluno' })
            
        }


    }
}

module.exports = new UsuarioController


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
            const { endereco_id } = req.body
            const { email } = req.body
            const { senha } = req.body
            const { data_nascimento } = req.body

            const usuario = await Usuario.create({
                nome: nome,
                sexo: sexo,
                cpf: cpf,
                endereco_id: endereco_id,
                email: email,
                senha: senha,
                data_nascimento: data_nascimento
            })

            res.status(201).json(usuario)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não possível cadastrar o usuário' })

        }


    }

    async atualizar(req, res) {

        const { id } = req.params
        const data = req.body

        try {
            const [updated] = await Usuario.update(
                data, {
                where: { id: id }

            })

            res.status(200).json({ message: "Usuário atualizado com sucesso." })

        } catch (error) {

            console.log(error.message)
            res.status(500).json({ error: "Erro ao atualizar o usuário." })

        }



    }

    async deletar(req, res) {
        const { id } = req.params

        await Usuario.destroy({
            where: {
                id: id
            }
        })

        res.status(204).json({})
    }    
}

module.exports = new UsuarioController


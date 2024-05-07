const Usuario = require("../models/Usuario");

class UsuarioController {

    async listar(req, res) {
        const usuario = await Usuario.findAll()
        res.json(usuario)
    }

    async cadastrar(req, res) {
        try {
            const { nome, sexo, cpf, endereco, email, senha, data_nascimento } = req.body;
    
            let usuario = await Usuario.findOne({ where: { cpf: cpf } });
            if (usuario) {
                throw new Error('CPF já cadastrado.');
            }
    
            usuario = await Usuario.findOne({ where: { email: email } });
            if (usuario) {
                throw new Error('E-mail já cadastrado.');
            }
    
            usuario = await Usuario.create({
                nome: nome,
                sexo: sexo,
                cpf: cpf,
                endereco: endereco,
                email: email,
                senha: senha,
                data_nascimento: data_nascimento
            });
    
            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({message: error.message});
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
    
        const usuario = await Usuario.findOne({
            where: {
                id: id
            }
        })
    
        if (!usuario) {
            return res.status(404).json({message: 'Usuário não existe.'})
        }
    
        await Usuario.destroy({
            where: {
                id: id
            }
        })
    
        res.status(200).json({message: 'Usuário deletado com sucesso.'})
    }   
}

module.exports = new UsuarioController


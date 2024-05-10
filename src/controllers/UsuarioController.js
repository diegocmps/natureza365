const Local = require("../models/Local");
const Usuario = require("../models/Usuario");

class UsuarioController {

    async listar(req, res) {
        const usuario = await Usuario.findAll()
        res.json(usuario)
    }

    async cadastrar(req, res) {
        try {
            const { nome } = req.body;
            const { sexo } = req.body
            const { cpf } = req.body
            const { endereco } = req.body
            const { email } = req.body
            const { senha } = req.body
            const { data_nascimento } = req.body


            let usuario = await Usuario.findOne({ where: { cpf: cpf } });
            if (usuario) {
                return res.status(400).json({ message: 'CPF já cadastrado.' });
            }

            usuario = await Usuario.findOne({ where: { email: email } });
            if (usuario) {
                return res.status(400).json({ message: 'E-mail já cadastrado.' });
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
            res.status(500).json({ message: error.message });
        }
    }


    async atualizar(req, res) {
        const id = Number(req.params.id);
        const { data } = req.body;

        const validarUsuario = req.payload.sub

        if (validarUsuario !== id) {
            return res.status(403).json({ message: 'Você não tem permissão para atualizar este usuário.' })

        }

        if (data.cpf) {
            const usuarioExistente = await Usuario.findOne({ where: { cpf: data.cpf } });
            if (usuarioExistente && usuarioExistente.id !== id) {
                return res.status(400).json({ message: 'CPF já está em uso.' });
            }
        }

        if (data.email) {
            const usuarioExistente = await Usuario.findOne({ where: { email: data.email } });
            if (usuarioExistente && usuarioExistente.id !== id) {
                return res.status(400).json({ message: 'E-mail já está em uso.' });
            }
        }

        delete data.id //comando para impedir que o usuario altere a proprie id.


        try {

            const [updated] = await Usuario.update(data, {
                where: { id: id }
            });

            if (updated) {

                res.status(200).json({ message: "Usuário atualizado com sucesso." })
                    ;
            } else {
                res.status(404).json({ error: "Usuário não encontrado." });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "Erro ao atualizar o usuário." });
        }
    }

    async deletar(req, res) {
        const id = Number(req.params.id)

        const usuarioLogadoId = req.payload.sub

        console.log(usuarioLogadoId)

        if (usuarioLogadoId !== id) {
            return res.status(403).json({ message: 'Você não tem permissão para deletar este usuário.' })
        }

        const usuario = await Usuario.findOne({
            where: {
                id: id
            }
        })

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não existe.' })
        }

        const locais = await Local.findAll({
            where: {
                usuario_id: id,
            },
        });

        if (locais.length > 0) {
            return res.status(400).json({ message: 'Este usuário possui locais cadastrados. Não é possível excluí-lo.' });
        }

        await Usuario.destroy({
            where: {
                id: id
            }
        })

        res.status(200).json({ message: 'Usuário deletado com sucesso.' })
    }
}

module.exports = new UsuarioController


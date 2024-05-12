const Local = require("../models/Local");
const Usuario = require("../models/Usuario");
const { hash } = require("bcrypt");


class UsuarioController {

    async cadastrar(req, res) {
        /*
            #swagger.tags = ['Cadastro de Usuário e Login'].  
            #swagger.parameters['body'] = {
            in: 'body',
            description: 'Campo para cadastro de dados do usuário',
            schema: {
              $nome: 'John Doe',
              $sexo: 'masculino',
              $cpf: '98765432100',
              $endereco: 'Rua das Cegonhas',
              $email: 'john@email.com',
              $senha: '12345678',
              $data_nascimento: '1984-11-25'
                }
             },
            #swagger.responses[201] = { description: 'Usuário cadastrado com sucesso.' },
            #swagger.responses[400] = { description: 'Registro de dado obrigatório' },
            #swagger.responses[422] = { description: 'Informe o dado no formato correto. ' },
            #swagger.responses[500] = { description: 'Não foi possível realizar o cadastro.' }
            
        */

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
            res.status(500).json({ message: 'Não foi possível realizar o cadastro.' });
        }
    }


    async atualizar(req, res) {
        /*
            #swagger.tags = ['Usuário - Editar'],
            #swagger.parameters['id'] = { description: 'Insira ID do usuário', type: 'number' }  
            #swagger.parameters['body'] = {
            in: 'body',
            description: 'Campo para atualizar dados do usuário',
            schema: {
                $nome: 'John Doe',
                $sexo: 'masculino',
                $cpf: '98765432100',
                $endereco: 'Rua das Cegonhas',
                $email: 'john@email.com',
                $senha: '12345678',
                $data_nascimento: '1984-11-25'
                }
                },
            #swagger.responses[200] = { description: 'Usuário atualizado com sucesso.' },
            #swagger.responses[400] = { description: 'Registro de dado obrigatório' },
            #swagger.responses[401] = { description: 'Você não tem permissão para atualizar este usuário.' },
            #swagger.responses[404] = { description: 'Usuário não encontrado. ' },
            #swagger.responses[422] = { description: 'Informe o dado no formato correto. ' },
            #swagger.responses[500] = { description: 'Erro ao atualizar o usuário.' }
        */


        const id = Number(req.params.id);
        const { nome } = req.body
        const { sexo } = req.body
        const { cpf } = req.body
        const { endereco } = req.body
        const { email } = req.body
        let { senha } = req.body
        const { data_nascimento } = req.body

        const validarUsuario = req.payload.sub

        if (validarUsuario !== id) {
            return res.status(401).json({ message: 'Você não tem permissão para atualizar este usuário.' })

        }

        if (cpf) {
            const usuarioExistente = await Usuario.findOne({ where: { cpf } });
            if (usuarioExistente && usuarioExistente.id !== id) {
                return res.status(400).json({ message: 'CPF já está em uso.' });
            }
        }

        if (email) {
            const usuarioExistente = await Usuario.findOne({ where: { email } });
            if (usuarioExistente && usuarioExistente.id !== id) {
                return res.status(400).json({ message: 'E-mail já está em uso.' });
            }
        }

        if (senha) {
            senha = await hash(senha, 8);
        }



        try {

            const [updated] = await Usuario.update({
                nome,
                sexo,
                cpf,
                endereco,
                email,
                senha,
                data_nascimento

            }, {
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

        /*  #swagger.tags = ['Usuário - Editar'], 
            #swagger.parameters['id'] = { description: 'Insira sua ID para deletar.', type: 'number' },
            #swagger.responses[200] = { description: 'Usuário deletado com sucesso.' },
            #swagger.responses[400] = { description: 'Este usuário possui locais cadastrados. Não é possível excluí-lo.' },
            #swagger.responses[401] = { description: 'Você não tem permissão para deletar este usuário.' },
            #swagger.responses[404] = { description: 'Usuário não existe.' },
            #swagger.responses[500] = { description: 'Não foi possível deletar o usuário.' },


        */

        try {

            const id = Number(req.params.id)

            const usuarioLogadoId = req.payload.sub
    
            console.log(usuarioLogadoId)
    
            if (usuarioLogadoId !== id) {
                return res.status(401).json({ message: 'Você não tem permissão para deletar este usuário.' })
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
    
            
        } catch (error) {

            return res.status(500).json({message: 'Não foi possível deletar o usuário.'})
            
        }

    }
}

module.exports = new UsuarioController


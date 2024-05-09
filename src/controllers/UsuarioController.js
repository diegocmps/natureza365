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
    const id = Number(req.params.id);
    const data = req.body;

    const validarUsuario =  req.payload.sub

    if(validarUsuario !== id){
        return res.status(403).json({message: 'Você não tem permissão para atualizar este usuário.'})

    }

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
            return res.status(403).json({message: 'Você não tem permissão para deletar este usuário.'})
        }
    
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


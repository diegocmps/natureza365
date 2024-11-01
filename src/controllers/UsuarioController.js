const Usuario = require('../models/Usuario');
const Local = require('../models/Local');
const { Op } = require('sequelize');

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    return true;
}

class UsuarioController {
    async cadastrar(req, res) {
        /*
             #swagger.tags = ['Usuario'],
             #swagger.parameters = ['body'] ={
               in: 'body',
               description: 'Cadastra novos usuários!',
               schema: {
                $nome: 'Taline Araujo',
                $email: 'taline.araujo@hotmail.com',
                $cpf: '02602502789',
                sexo: 'Feminino',
                $senha: 'teste123',
                $data_nascimento: '1996-04-03',
                $endereco: 'Vargem pequena',
                $cep: '12345-678',
                $rua: 'Rua Exemplo',
                $numero: '123',
                $complemento: 'Apto 1',
                $bairro: 'Bairro Exemplo',
                $cidade: 'Cidade Exemplo',
                $estado: 'Estado Exemplo'
            }   
        }
        */
        try {
            const {
                nome,
                email,
                cpf,
                sexo,
                senha,
                data_nascimento,
                cep,
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                estado
            } = req.body;

            if (!nome) {
                return res.status(400).json({ message: 'O nome é obrigatório' });
            }

            if (!senha) {
                return res.status(400).json({ message: 'A senha é obrigatória' });
            }

            if (!email) {
                return res.status(400).json({ message: 'O email é obrigatório' });
            }

            const usuarioCadastrado = await Usuario.findOne({ where: { email } });
            if (usuarioCadastrado) {
                return res.status(400).json({ error: true, message: 'Email já cadastrado!' });
            }

            if (!cpf || !validarCPF(cpf)) {
                return res.status(400).json({ message: 'CPF inválido' });
            }

            if (!data_nascimento) {
                return res.status(400).json({ message: 'A data de nascimento é obrigatória' });
            }

            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/)) {
                return res.status(400).json({ message: 'A data de nascimento não está no formato correto' });
            }

            const usuario = await Usuario.create({
                nome,
                email,
                cpf,
                sexo,
                senha,
                data_nascimento,
                cep,
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                estado
            });

            res.status(201).json(usuario);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível cadastrar o usuário' });
        }
    }

    async buscarPorId(req, res) {
        /*
          #swagger.tags = ['Usuario'],  
          #swagger.parameters['ID'] = {
              in: 'query',
              description: 'Filtrar usuario pelo ID',
              type: 'string'
          }
        */
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }

            res.json(usuario);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }

    async buscarTodos(req, res) {
        /*   #swagger.tags = ['Usuario'],  
             #swagger.parameters['Usuario'] = {
                 in: 'query',
                 description: 'Buscar todos os usuarios',
                 type: 'string'
         } 
        */
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    }

    async excluir(req, res) {
        /*  #swagger.tags = ['Usuario'],  
            #swagger.parameters['Usuario_id'] = {
                in: 'query',
                description: 'Excluir usuario',
                type: 'string'
        } 
        */
        try {
            const { id } = req.params;
            const enderecoUsuario = await Local.findOne({ where: { usuarioId: id } });

            // Verifica se o usuário possui endereços cadastrados
            if (enderecoUsuario) {
                return res.status(400).json({ error: true, message: 'Este usuário não pode ser excluído pois possui endereços cadastrados.' });
            }

            // Tenta excluir o usuário
            const usuarioExcluido = await Usuario.destroy({ where: { id } });

            // Verifica se o usuário foi encontrado e excluído
            if (!usuarioExcluido) {
                return res.status(404).json({ error: true, message: 'Usuário não encontrado.' });
            }

            return res.status(204).send();
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: true, message: 'Não foi possível excluir o usuário.' });
        }
    }

    async editar(req, res) {
        /*
             #swagger.tags = ['Usuario'],
             #swagger.parameters = ['body'] ={
               in: 'body',
               description: 'Edita um usuário existente!',
               schema: {
            $nome: 'Diego Campos',
            $email: 'diego.campos@hotmail.com',
            $sexo: 'Masculino',
            $senha: 'funcionando',
            $data_nascimento: '1996-05-02',
            $cep: '12345-678',
            $rua: 'Rua Atualizada',
            $numero: '456',
            $complemento: 'Apto 2',
            $bairro: 'Bairro Atualizado',
            $cidade: 'Cidade Atualizada',
            $estado: 'Estado Atualizado'
            }   
        }
        */
        try {
            const { id } = req.params;
            const {
                nome,
                email,
                sexo,
                senha,
                data_nascimento,
                cep,
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                estado
            } = req.body;


            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }


            if (!nome) {
                return res.status(400).json({ message: 'O nome é obrigatório' });
            }

            if (!email) {
                return res.status(400).json({ message: 'O email é obrigatório' });
            }


            const usuarioCadastrado = await Usuario.findOne({ where: { email, id: { [Op.ne]: id } } });
            if (usuarioCadastrado) {
                return res.status(400).json({ error: true, message: 'Email já cadastrado!' });
            }


            await usuario.update({
                nome,
                email,
                sexo,
                senha,
                data_nascimento,
                cep,
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                estado
            });

            res.json({ message: 'Usuário atualizado com sucesso!', usuario });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível atualizar o usuário' });
        }
    }
}

module.exports = new UsuarioController();
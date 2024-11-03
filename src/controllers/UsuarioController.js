const Usuario = require('../models/Usuario');
const Local = require('../models/Local');
const { Op } = require('sequelize');
const { usuarioSchema, usuarioUpdateSchema } = require('../validators/usuarioValidation');


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
    #swagger.tags = ['Cadastro de Usuário e Login'].
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Campo para cadastro de dados do usuário',
        schema: {
            $nome: 'John Doe',
            $email: 'john@email.com',
            $cpf: '98765432100',
            $sexo: 'masculino',
            $senha: '12345678',
            $data_nascimento: '1984-11-25',
            $cep: '12345678',
            $rua: 'Rua das Cegonhas',
            $numero: '123',
            $complemento: 'Apto 45',
            $bairro: 'Bairro Exemplo',
            $cidade: 'Cidade Exemplo',
            $estado: 'Estado Exemplo'
        }
    },
    #swagger.responses[201] = { description: 'Usuário cadastrado com sucesso.' },
    #swagger.responses[400] = { description: 'Registro de dado obrigatório. Erros: [{ field: "email", message: "Email já cadastrado!" }, ...]' },
    #swagger.responses[422] = { description: 'Informe o dado no formato correto. Erros: [{ field: "nome", message: "O nome é obrigatório" }, ...]' },
    #swagger.responses[500] = { description: 'Não foi possível realizar o cadastro.' }
*/

        try {
            await usuarioSchema.validate(req.body, { abortEarly: false });

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

            const usuarioCadastrado = await Usuario.findOne({
                where: {
                    [Op.or]: [{ email }, { cpf }]
                }
            });

            if (usuarioCadastrado) {
                const errors = [];
                if (usuarioCadastrado.email === email) {
                    errors.push({ field: 'email', message: 'Email já cadastrado!' });
                }
                if (usuarioCadastrado.cpf === cpf) {
                    errors.push({ field: 'cpf', message: 'CPF já cadastrado!' });
                }
                return res.status(400).json({ error: true, message: 'Erro de validação', errors });
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
            if (error.name === 'ValidationError') {
                const errors = error.inner.map(err => ({ field: err.path, message: err.message }));
                return res.status(400).json({ error: true, message: 'Erro de validação', errors });
            }

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

            if (enderecoUsuario) {
                return res.status(400).json({ error: true, message: 'Este usuário não pode ser excluído pois possui endereços cadastrados.' });
            }

            const usuarioExcluido = await Usuario.destroy({ where: { id } });

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
      #swagger.tags = ['Usuario']
      #swagger.parameters['ID'] = {
          in: 'path',
          description: 'ID do usuário a ser atualizado',
          required: true,
          type: 'string'
      }
      #swagger.parameters['body'] = {
          in: 'body',
          description: 'Dados do usuário para atualização',
          schema: {
              $nome: 'John Doe',
              $sexo: 'masculino',
              $cpf: '98765432100',
              $email: 'john@email.com',
              $senha: '12345678',
              $data_nascimento: '1984-11-25',
              $cep: '12345678',
              $rua: 'Rua das Cegonhas',
              $numero: '123',
              $complemento: 'Apto 45',
              $bairro: 'Bairro Exemplo',
              $cidade: 'Cidade Exemplo',
              $estado: 'Estado Exemplo'
          }
      },
      #swagger.responses[200] = { 
          description: 'Usuário atualizado com sucesso!', 
          schema: { 
              message: 'Usuário atualizado com sucesso!', 
              usuario: {
                  $id: '1',
                  $nome: 'John Doe',
                  $email: 'john@email.com',
                  $cpf: '98765432100',
                  $sexo: 'masculino',
                  $data_nascimento: '1984-11-25',
                  $cep: '12345678',
                  $rua: 'Rua das Cegonhas',
                  $numero: '123',
                  $complemento: 'Apto 45',
                  $bairro: 'Bairro Exemplo',
                  $cidade: 'Cidade Exemplo',
                  $estado: 'Estado Exemplo'
              }
          }
      },
      #swagger.responses[400] = { description: 'Email já cadastrado!' },
      #swagger.responses[422] = { description: 'Erro de validação nos dados do usuário.' },
      #swagger.responses[404] = { description: 'Usuário não encontrado!' },
      #swagger.responses[500] = { description: 'Não foi possível atualizar o usuário' }
    */


        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }

            await usuarioUpdateSchema.validate(req.body, { abortEarly: false });

            const { nome, email, sexo, senha, data_nascimento, cep, rua, numero, complemento, bairro, cidade, estado } = req.body;

            const usuarioCadastrado = await Usuario.findOne({ where: { email, id: { [Op.ne]: id } } });
            if (usuarioCadastrado) {
                return res.status(400).json({ error: true, message: 'Email já cadastrado!' });
            }

            await usuario.update({
                nome, email, sexo, senha, data_nascimento, cep, rua, numero, complemento, bairro, cidade, estado
            });

            res.json({ message: 'Usuário atualizado com sucesso!', usuario });
        } catch (error) {
            if (error.name === 'ValidationError') {
                const errors = error.inner.map(err => ({ field: err.path, message: err.message }));
                return res.status(400).json({ errors });
            }

            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível atualizar o usuário' });
        }
    }
}

module.exports = new UsuarioController();
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
          #swagger.tags = ['Usuario'],
          #swagger.description = 'Cadastrar um novo usuário.'
          #swagger.parameters['Usuario'] = {
              in: 'body',
              required: true,
              schema: {
                  type: 'object',
                  properties: {
                      nome: { type: 'string', example: 'João Silva' },
                      email: { type: 'string', example: 'joao@exemplo.com' },
                      cpf: { type: 'string', example: '12345678901' },
                      sexo: { type: 'string', enum: ['masculino', 'feminino'], example: 'masculino' },
                      senha: { type: 'string', example: 'senhaSegura123' },
                      data_nascimento: { type: 'string', format: 'date', example: '1990-01-01' },
                      cep: { type: 'string', example: '12345678' },
                      rua: { type: 'string', example: 'Rua das Flores' },
                      numero: { type: 'string', example: '123' },
                      complemento: { type: 'string', example: 'Apto 101' },
                      bairro: { type: 'string', example: 'Centro' },
                      cidade: { type: 'string', example: 'São Paulo' },
                      estado: { type: 'string', example: 'SP' }
                  },
                  required: ['nome', 'email', 'cpf', 'sexo', 'senha', 'data_nascimento', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado']
              }
          }
          #swagger.responses[201] = {
              description: 'Usuário cadastrado com sucesso.',
              schema: { $ref: '#/definitions/Usuario' }
          }
          #swagger.responses[400] = {
              description: 'Erro de validação ou usuário já cadastrado.',
              schema: {
                  type: 'object',
                  properties: {
                      error: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Email já cadastrado!' },
                      errors: { type: 'array', items: { $ref: '#/definitions/ValidationError' } }
                  }
              }
          }
          #swagger.responses[500] = {
              description: 'Erro interno do servidor.',
              schema: {
                  type: 'object',
                  properties: {
                      error: { type: 'string', example: 'Não foi possível cadastrar o usuário' }
                  }
              }
          }
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
                return res.status(400).json({error: true, message: 'Erro de validação', errors });
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
          #swagger.tags = ['Usuario'],
          #swagger.description = 'Editar um usuário existente.'
          #swagger.parameters['ID'] = {
              in: 'path',
              required: true,
              description: 'ID do usuário a ser editado',
              type: 'string'
          }
          #swagger.parameters['Usuario'] = {
              in: 'body',
              required: false,
              schema: {
                  type: 'object',
                  properties: {
                      nome: { type: 'string', example: 'João Silva' },
                      email: { type: 'string', example: 'joao@exemplo.com' },
                      cpf: { type: 'string', example: '12345678901' },
                      sexo: { type: 'string', enum: ['masculino', 'feminino'], example: 'masculino' },
                      senha: { type: 'string', example: 'senhaSegura123' },
                      data_nascimento: { type: 'string', format: 'date', example: '1990-01-01' },
                      cep: { type: 'string', example: '12345678' },
                      rua: { type: 'string', example: 'Rua das Flores' },
                      numero: { type: 'string', example: '123' },
                      complemento: { type: 'string', example: 'Apto 101' },
                      bairro: { type: 'string', example: 'Centro' },
                      cidade: { type: 'string', example: 'São Paulo' },
                      estado: { type: 'string', example: 'SP' }
                  }
              }
          }
          #swagger.responses[200] = {
              description: 'Usuário atualizado com sucesso.',
              schema: { type: 'object', properties: { message: { type: 'string', example: 'Usuário atualizado com sucesso!' }, usuario: { $ref: '#/definitions/Usuario' } } }
          }
          #swagger.responses[404] = {
              description: 'Usuário não encontrado.',
              schema: { type: 'object', properties: { message: { type: 'string', example: 'Usuário não encontrado!' } } }
          }
          #swagger.responses[400] = {
              description: 'Erro de validação ou email já cadastrado.',
              schema: {
                  type: 'object',
                  properties: {
                      error: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Email já cadastrado!' },
                      errors: { type: 'array', items: { $ref: '#/definitions/ValidationError' } }
                  }
              }
          }
          #swagger.responses[500] = {
              description: 'Erro interno do servidor.',
              schema: {
                  type: 'object',
                  properties: {
                      error: { type: 'string', example: 'Não foi possível atualizar o usuário' }
                  }
              }
          }
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
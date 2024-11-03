const Local = require('../models/Local');

class LocalController {
    async adicionarLocal(req, res) {
        /*
            #swagger.tags = ['Locais - Cadastrar e editar']
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Campo para cadastro de dados do local da natureza',
                schema: {
                    $nome: 'Trilha da Lagoinha do Leste',
                    $descricao: 'A Praia da Lagoinha do Leste é um dos paraísos mais preservados do sul de Florianópolis...',
                    $cep: '88067079',
                    $rua: 'Rua das Flores',
                    $bairro: 'Bairro Verde',
                    $cidade: 'Florianópolis',
                    $estado: 'SC',
                    $latitude: -27.5902,
                    $longitude: -48.4935
                }
            },
            #swagger.responses[201] = { description: 'Local cadastrado com sucesso.' },
            #swagger.responses[400] = { description: 'Registro de dado obrigatório' },
            #swagger.responses[500] = { description: 'Não foi possível realizar o cadastro' }
        */
        try {
            const usuarioId = req.payload.sub;
            const { nome, descricao, cep, rua, bairro, cidade, estado, latitude, longitude } = req.body;

            const requiredFields = [nome, cep, rua, bairro, cidade, estado, latitude, longitude];
            const missingFields = requiredFields.filter(field => !field);

            if (missingFields.length) {
                return res.status(400).json({ message: 'Todos os campos de endereço são obrigatórios!' });
            }

            const novoLocal = await Local.create({
                nome,
                descricao,
                cep,
                rua,
                bairro,
                cidade,
                estado,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                usuarioId
            });

            return res.status(201).json(novoLocal);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao cadastrar o local', error: error.message });
        }
    }


    async atualizarLocal(req, res) {
        /*
            #swagger.tags = ['Locais - Cadastrar e editar']
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Campo para cadastro de dados do local da natureza',
                schema: {
                    $nome: 'Trilha da Lagoinha do Leste',
                    $descricao: 'A Praia da Lagoinha do Leste é um dos paraísos mais preservados do sul de Florianópolis...',
                    $cep: '88067079',
                    $rua: 'Rua das Flores',
                    $bairro: 'Bairro Verde',
                    $cidade: 'Florianópolis',
                    $estado: 'SC',
                    $latitude: -27.5902,
                    $longitude: -48.4935
                }
            },
            #swagger.responses[201] = { description: 'Local cadastrado com sucesso.' },
            #swagger.responses[400] = { description: 'Registro de dado obrigatório' },
            #swagger.responses[500] = { description: 'Não foi possível realizar o cadastro' }
        */
        try {
            const usuarioId = req.payload.sub;
            const { nome, descricao, cep, rua, bairro, cidade, estado, latitude, longitude } = req.body;

            const requiredFields = [nome, cep]; // Campos obrigatórios
            const missingFields = requiredFields.filter(field => !field);

            if (missingFields.length) {
                return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' });
            }

            const localAtualizar = await Local.findOne({ where: { id: req.params.localId, usuarioId } });
            if (!localAtualizar) {
                return res.status(404).json({ message: 'Local não encontrado!' });
            }

            localAtualizar.nome = nome;
            localAtualizar.descricao = descricao || localAtualizar.descricao;
            localAtualizar.cep = cep;
            localAtualizar.rua = rua;
            localAtualizar.bairro = bairro;
            localAtualizar.cidade = cidade;
            localAtualizar.estado = estado;
            localAtualizar.latitude = parseFloat(latitude);
            localAtualizar.longitude = parseFloat(longitude);

            await localAtualizar.save();

            return res.status(200).json(localAtualizar);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Não foi possível atualizar as informações do local.' });
        }
    }

    async deletarLocal(req, res) {
        /*  
        #swagger.tags = ['Local'],  
        #swagger.parameters['localId'] = {
            in: 'path',
            description: 'ID do local a ser excluído',
            required: true,
            type: 'string'
        } 
        */
        try {
            const usuarioId = req.payload.sub;
            const localDeletar = await Local.findOne({ where: { id: req.params.localId, usuarioId } });

            if (!localDeletar) {
                return res.status(404).json({ message: 'Local não encontrado.' });
            }
            await localDeletar.destroy();

            res.status(200).json({ message: 'Local excluído com sucesso.' });
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível excluir o local' });
        }
    }

    async listarTodosOsLocais(req, res) {
        /* #swagger.tags = ['Local'],  
        #swagger.description = 'Buscar todos os locais cadastrados'
        */
        try {
            const locais = await Local.findAll();

            if (!locais || locais.length === 0) {
                return res.status(404).json({ message: 'Nenhum local cadastrado' });
            }

            res.status(200).json(locais);
        } catch (error) {
            return res.status(500).json({ error: 'Não foi possível obter os locais cadastrados' });
        }
    }

    async listarLocaisPorUsuario(req, res) {
        /*
        #swagger.tags = ['Local'],
        #swagger.description = 'Listar locais cadastrados por usuário'
        */
        try {
            const usuarioId = req.payload.sub;
            const locais = await Local.findAll({ where: { usuarioId } });

            if (!locais || locais.length === 0) {
                return res.status(404).json({ message: 'Nenhum local cadastrado por este usuário' });
            }

            res.status(200).json(locais);
        } catch (error) {
            return res.status(500).json({ error: 'Não foi possível obter os locais cadastrados' });
        }
    }

    async exibirLocal(req, res) {
        /* #swagger.tags = ['Local'],  
        #swagger.description = 'Exibir local específico do usuário'
        #swagger.parameters['localId'] = {
            in: 'path',
            description: 'ID do local',
            required: true,
            type: 'string'
        }
        */
        try {
            const usuarioId = req.payload.sub;
            const localId = req.params.localId;

            console.log("usuarioId:", usuarioId);
            console.log("localId:", localId);

            const local = await Local.findOne({ where: { id: localId } });

            console.log("Local encontrado:", local);

            if (!local) {
                return res.status(404).json({ message: 'Local não encontrado ou acesso não permitido' });
            }

            res.status(200).json(local);
        } catch (error) {
            console.error("Erro ao buscar o local:", error);
            return res.status(500).json({ error: 'Não foi possível obter o local' });
        }
    }
}

module.exports = new LocalController();

const Local = require("../models/Local");
const Usuario = require("../models/Usuario");
const { openStreetMap, linkGoogleMap } = require("../services/map.service");

class LocalController {

    async listarGmaps(req, res) {
        const { local_id } = req.params;

        const local = await Local.findOne({
            where: { id: local_id }
        });

        if (!local) {
            return res.status(404).json({ message: 'Local não encontrado' });
        }

        if (req.payload.sub !== local.usuario_id) {
            return res.status(403).json({ error: 'Você não tem permissão para acessar este local.' });
        }

        res.json(local.coord_geo);
    }


    async listar(req, res) {
        
        const usuario_id = Number(req.params.usuario_id);

        if (req.params.usuario_id === undefined) {
            return res.status(400).json({ message: 'Usuário não localizado.' });
        }

        const usuario = await Usuario.findByPk(usuario_id);

        if(!usuario){
            return res.status(400).json({message: 'Usuário não encontrado.'})
        }

        if (req.payload.sub !== usuario_id) {
            return res.status(403).json({ error: 'Você não tem permissão para acessar estes locais.' });
        }

        const local = await Local.findAll({
            where: { usuario_id }
        });

        res.json(local);
    }

    async listarUm(req, res) {

        const { usuario_id, local_id } = req.params

        const local = await Local.findOne({
            where: { id: local_id, usuario_id }
        })


        if (!local) {
            return res.status(403).json({ message: 'Local não encontrado.' })
        }

        if (req.payload.sub !== local.usuario_id) {
            return res.status(403).json({ error: 'Você não tem permissão para acessar este local.' });
        }


        res.json(local)

    }

    async cadastrar(req, res) {
        try {
            const { usuario_id, nome_local, descricao, cep } = req.body;

            if (req.payload.sub !== Number(usuario_id)) {
                return res.status(403).json({ message: 'Você não tem permissão para cadastrar este local.' })
            }

            const usuario = await Usuario.findByPk(usuario_id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            const localExistente = await Local.findOne({ where: { usuario_id, nome_local } });
            if (localExistente) {
                return res.status(400).json({ message: 'Local já cadastrado.' });
            }

            let resposta;
            try {
                resposta = await openStreetMap(cep);
            } catch (error) {
                if (error.message === 'CEP não encontrado') {
                    return res.status(400).json({ message: 'CEP não encontrado' });
                }
                throw error;
            }

            let googleMap = await linkGoogleMap(cep);
            let localidade = resposta.display_name;

            await Local.create({
                usuario_id: usuario_id,
                nome_local: nome_local,
                descricao: descricao,
                cep: cep,
                localidade: localidade,
                coord_geo: googleMap
            });

            res.status(201).json({ message: 'Local cadastrado com sucesso.' });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Não foi possível realizar o cadastro' });
        }
    }




    async atualizar(req, res) {

        try {
            const { usuario_id, id } = req.params
            const { nome_local, descricao, cep } = req.body

            const local = await Local.findOne({ where: { id } })

            if (req.payload.sub !== local.usuario_id) {
                return res.status(403).json({ error: 'Você não tem permissão para atualizar este local.' });
            }

            const localExistente = await Local.findOne({ where: { usuario_id, nome_local } });

            if (localExistente && localExistente.id != id) {
                return res.status(400).json({ message: 'Local já cadastrado.' });
            }

            let resposta;

            try {
                resposta = await openStreetMap(cep);
            } catch (error) {
                if (error.message === 'CEP não encontrado') {
                    return res.status(400).json({ message: 'CEP não encontrado' });
                }
                throw error;
            }

            let googleMap = await linkGoogleMap(cep);
            let localidade = resposta.display_name;

            await local.update({
                nome_local: nome_local,
                descricao: descricao,
                cep: cep,
                localidade: localidade,
                coord_geo: googleMap
            });

            res.status(200).json({ message: "Local atualizado com sucesso." })

        } catch (error) {

            console.log(error.message)
            res.status(500).json({ error: "Erro ao atualizar o local." })

        }

    }



    async deletar(req, res) {
        const { usuario_id, id } = req.params

        const usuario = await Local.findOne({ where: { usuario_id, id } })

        if (!usuario) {
            return res.status(404).json({ error: 'Local não encontrado.' });
        }

        if (req.payload.sub !== usuario.usuario_id) {
            return res.status(403).json({ error: 'Você não tem permissão para deletar este local.' });
        }

        Local.destroy({
            where: {
                id: id
            }
        })

        res.status(200).json({ message: "Local deletado com sucesso." })
    }

}

module.exports = new LocalController
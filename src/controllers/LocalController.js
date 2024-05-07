const Local = require("../models/Local");
const { openStreetMap, linkGoogleMap } = require("../services/map.service");

class LocalController {

    async listarGmaps(req, res) {
        const { local_id } = req.params;

        const local = await Local.findOne({
            where: { id: local_id }
        });

        if (local) {
            res.json(local.coord_geo);
        } else {
            res.status(404).json({ message: 'Local não encontrado' });
        }

    }



    async listar(req, res) {

        const { usuario_id } = req.params


        const local = await Local.findAll({
            where: { usuario_id }
        })

        res.json(local)

    }

    async listarUm(req, res) {

        const { usuario_id, local_id } = req.params

        const local = await Local.findOne({
            where: { id: local_id, usuario_id }
        })

        res.json(local)

    }



    async cadastrar(req, res) {
        try {
            const { usuario_id, nome_local, descricao, cep } = req.body;

            if (!cep) {
                return res.status(400).json({ message: 'O CEP é obrigatório' });
            }

            const localExistente = await Local.findOne({ where: { usuario_id, nome_local } });
            if (localExistente) {
                return res.status(400).json({ message: 'Local já cadastrado.' });
            }

            let resposta = await openStreetMap(cep);
            let googleMap = await linkGoogleMap(cep);
            console.log(googleMap);
            console.log(resposta);
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

        const { usuario_id, id } = req.params
        const { nome_local, descricao, localidade, coord_geo } = req.body
        const local = await Local.findOne({ where: { usuario_id, id } })

        if (!local) {
            return res.status(403).json({ error: 'Você não tem permissão para atualizar este local.' });
        }

        try {
            await local.update({
                nome_local: nome_local,
                descricao: descricao,
                localidade: localidade,
                coord_geo: coord_geo
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
            return res.status(403).json({ error: 'Você não tem permissão para deletar este local.' });
        }





        Local.destroy({
            where: {

                id: id
            }
        })

        res.status(200).json({message: "Local deletado com sucesso."})


    }

}

module.exports = new LocalController
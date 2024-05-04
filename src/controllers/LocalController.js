const Local = require("../models/Local");

class LocalController {

    async listaMestra(req, res) {

        const local = await Local.findAll()

        res.json(local)

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

        const { usuario_id } = req.body
        const { nome_local } = req.body
        const { descricao } = req.body
        const { localidade } = req.body
        const { coord_geo } = req.body

        Local.create({
            usuario_id: usuario_id,
            nome_local: nome_local,
            descricao: descricao,
            localidade: localidade,
            coord_geo: coord_geo
        })

        res.status(201).json({ message: 'Local cadastrado com sucesso.' })

        try {
            
        } catch (error) {

            res.status(500).json({message: 'Não foi possível realizar o cadastro'})
            
        }



    }

    async atualizar(req, res) {

        const { usuario_id, id } = req.params
        const { nome_local, descricao, localidade, coord_geo } = req.body
        const local = await Local.findOne({ where: {usuario_id, id}})

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
        
        const usuario = await Local.findOne({where: {usuario_id, id}})

        if (!usuario) {
            return res.status(403).json({ error: 'Você não tem permissão para deletar este local.' });
        } 

        

        

        const local = Local.destroy({
            where: {

                id: id
            }
        })

        res.status(204).json({})


    }

}

module.exports = new LocalController
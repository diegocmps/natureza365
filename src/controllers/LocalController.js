const Local = require("../models/Local");

class LocalController{

    async listar(req, res){
        const local = await Local.findAll()

        res.json(local)

    }

    async cadastrar(req, res){

        const {usuario_id} = req.body
        const {nome_local} = req.body
        const {descricao} = req.body
        const {localidade} = req.body
        const {coord_geo} = req.body

        const local = Local.create({
            usuario_id: usuario_id,
            nome_local: nome_local,
            descricao: descricao,
            localidade: localidade,
            coord_geo: coord_geo
        })

        res.status(201).json(local)
        
    }

    async atualizar(req, res){
        
        const { id } = req.params
        const data = req.body

        try {
            const [updated] = await Local.update(
                data, {
                where: { id: id }

            })

            res.status(200).json({ message: "Local atualizado com sucesso." })

        } catch (error) {

            console.log(error.message)
            res.status(500).json({ error: "Erro ao atualizar o local." })

        }
        
    }

    async deletar(req, res){
        
    }

}

module.exports = new LocalController
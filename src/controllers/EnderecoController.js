const Endereco = require("../models/Endereco");



class EnderecoController{

    async listar(req, res){
        const endereco = await Endereco.findAll()

        res.json(endereco)

    }

    async cadastrar(req, res){

        try {
            const {rua} = req.body
        const {numero} = req.body
        const {complemento} = req.body
        const {bairro} = req.body
        const {cidade} = req.body
        const {pais} = req.body
        const {cep} = req.body

        const endereco = Endereco.create({
            rua: rua,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            pais: pais,
            cep: cep
        })

        res.status(201).json(endereco)
            
        } catch (error) {

            console.log(error.message)
            res.status(500).json({message: "Não foi possível cadastrar."})
            
        }

        
        
    }

    async atualizar(req, res){
        
        const { id } = req.params
        const data = req.body

        try {
            const [updated] = await Endereco.update(
                data, {
                where: { id: id }

            })

            res.status(200).json({ message: "Endereço atualizado com sucesso." })

        } catch (error) {

            res.status(500).json({ error: "Erro ao atualizar o endereço." })

        }
        
    }

    async deletar(req, res){
        const {id} = req.params

        const endereco = Endereco.destroy({
            where: {

                id:id
            }
        })
        
        res.status(204).json({})

        
    }

}

module.exports = new EnderecoController
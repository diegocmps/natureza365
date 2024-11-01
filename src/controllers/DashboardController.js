const PagedResult = require("../classes/PagedResult");
const Local = require("../models/Local");
const Usuario = require("../models/Usuario");


class DashboardController {
    async home(req, res) {

        try {
            console.log('Iniciando busca de dados para a dashboard');

            const { page = 1, limit = 10 } = req.query;
            console.log(`Página: ${page}, Limite: ${limit}`);

            const usuariosTotal = await Usuario.count()
            console.log(`Total de usuários: ${usuariosTotal}`);

            const usuariosOnline = await Usuario.count({ where: { isLogged: true } })
            console.log(`Usuários online: ${usuariosOnline}`);

            const locaisTotal = await Local.count()
            console.log(`Total de locais: ${locaisTotal}`);

            const locais = await Local.findAll({
                include: {
                    model: Usuario,
                    as: "usuario",
                    attributes: ['nome']
                },
                order: [['id', 'ASC']],
                limit: limit,
                offset: (page - 1) * limit
            })

            console.log(`Locais encontrados: ${locais.length}`);

            const dados = {
                usuariosTotal: usuariosTotal,
                usuariosOnline: usuariosOnline,
                locaisTotal: locaisTotal,
                locais: locais                

            }

            console.log('Dados montados com sucesso:', dados);

            return res.status(200).json(new PagedResult(page, limit, dados, locaisTotal))
        }
        catch (error) {
            console.error("Erro ao recuperar dados:", error);
            return res.status(500).json({ message: "Erro ao recuperar dados" })
        }
    }
}

module.exports = new DashboardController();
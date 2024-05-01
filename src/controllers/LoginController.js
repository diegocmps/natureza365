const Usuario = require("../models/Usuario");

class LoginController {

    async login(req, res) {
        const {email} = req.body
        const {senha} = req.body
        
        const usuario = await Usuario.findOne({
            where: {
                email: email
            }
        })

        res.status(201).json({message: "Estou logado."})
    }

}

module.exports = new LoginController
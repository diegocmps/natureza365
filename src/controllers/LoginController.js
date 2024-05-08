const { sign } = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const { compare } = require("bcrypt");




class LoginController {


    async login(req, res) {

        try {

            const { email } = req.body
            const { senha } = req.body

            if (!email || !senha) {
                return res.status(400).json({ message: "Email e senha são necessários" });
            }

            const usuario = await Usuario.findOne({
                where: {
                    email: email
                }
            })
            if (!usuario) {
                return res.status(400).json({ message: "Email ou senha inválidos" });
            }
    
            const senhaCorreta = await compare(senha, usuario.senha)
    
            if (!senhaCorreta) {
                return res.status(400).json({ message: "Email ou senha inválidos" });
            }

            
            const payload = {
                sub: usuario.id,
                email: usuario.email,
                nome: usuario.nome
            }

            const token = sign(payload, process.env.SECRET_JWT)

            res.status(201).json({ Token: token })

        } catch (error) {

            console.log(error.message)

            return res.status(500).json({ error: error, message: "Algo inesperado aconteceu" })

        }

    }

}

module.exports = new LoginController()
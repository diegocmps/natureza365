const { sign } = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const { compare } = require("bcrypt");




class LoginController {


    async login(req, res) {

        try {

            const { email } = req.body
            const { senha } = req.body

            const usuario = await Usuario.findOne({
                where: {
                    email: email
                }
            })

            const hashSenha = await compare(senha, usuario.senha)

            const payload = {
                sub: usuario.id,
                email: usuario.email,
                nome: usuario.nome }

            const token = sign(payload, process.env.SECRET_JWT)



            res.status(201).json({Token: token})

        } catch (error) {

            console.log(error.message)

            return res.status(500).json({ error: error, message: "Algo inesperado aconteceu" })

        }

    }

}

module.exports = new LoginController()
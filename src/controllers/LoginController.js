const { sign } = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const { compare } = require("bcrypt");


class LoginController {


    async login(req, res) {
    /*
            #swagger.tags = ['Cadastro de Usuário e Login'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Campo para login e senha.',
                    schema: {
                    $email: 'john@email.com',
                    $senha: '12345678',
                        }
                    },
            #swagger.responses[201] = { description: 'Login realizado com sucesso.' },
            #swagger.responses[400] = { description: 'Registro de dado obrigatório' },
            #swagger.responses[500] = { description: 'Não foi possível realizar o login.' }

*/


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
                return res.status(400).json({ message: "E-mail ou senha incorretos." });
            }

            const testeSenha = await compare(senha, usuario.senha)

            if (testeSenha === false) {
                return res.status(400).json({ message: 'E-mail ou senha incorretos.' })
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

            return res.status(500).json({ error: error, message: "Não foi possível realizar o login." })

        }

    }

}

module.exports = new LoginController()
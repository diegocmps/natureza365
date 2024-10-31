const { compare } = require('bcryptjs');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

class LoginController {
    async login(req, res) {
        /*
           #swagger.tags = ['Login'],
           #swagger.parameters = ['body'] ={
             in: 'body',
             description: 'Realizar login!',
             schema: {
                $email: 'taline.araujo@hotmail.com',
                $senha: 'teste123'
             }   
          }
        */
        try {
            const email = req.body.email;
            const senha = req.body.senha;

            if (!email) {
                return res.status(400).json({ message: 'O email é obrigatório!' });
            }

            if (!senha) {
                return res.status(400).json({ message: 'A senha é obrigatória!' });
            }

            const usuario = await Usuario.findOne({
                where: { email: email }
            });

            const senhaDecoded = await compare(senha, usuario.senha)

            if (!usuario || senhaDecoded == false) {
                return res.status(404).json({ message: 'Não foi encontrado usuário correspondente aos dados fornecidos' });
            }

            const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome };
            const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '1h' });

            usuario.isLogged = true;
            await usuario.save()

            return res.json({ user: { id: usuario.id, nome: usuario.nome, email: usuario.email }, token: token });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Erro ao logar!' });
        }
    }

    async logout(req, res) {
        try {
            const usuarioId = req.payload.sub
            const usuarioLogado = await Usuario.findOne({
                where: {
                    id: usuarioId
                }
            })

            usuarioLogado.isLogged = false
            await usuarioLogado.save()

            return res.status(200).json({message: 'Logout realizado com sucesso'})

        } catch (error) {
            console.log(error)
            return res.status(500).json("Erro Interno do Servidor")
        }
    }
}

module.exports = new LoginController();
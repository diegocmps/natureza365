const { verify } = require("jsonwebtoken");

async function auth(req, res, next) {
    try {

        const { authorization } = req.headers

        req['payload'] = verify(authorization, process.env.SECRET_JWT)

        next()

    } catch (error) {

        return res.status(401).json({
            message: "Autenticação falhou!",
            cause: error.message
        })

    }
}

module.exports = { auth }
const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) =>{
    if(!req.headers.authorization){
        res.status(401).json({message: 'Acesso negado.'})
        return
    }

    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]

    try {
        const verificar = jwt.verify(token, process.env.JWT_SECRET)
        req.barbeiro = verificar
        next()
    } catch (error) {
        return res.status(401).json({message: 'Token inválido'})
    }
}

module.exports = checkToken
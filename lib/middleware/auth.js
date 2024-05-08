var jwt = require('jsonwebtoken')
import config from '../../config/config.json'

export const generateToken = async (userId) => {
    try {
        let secret = config.jwtSecret
        console.log('secret == ', secret)
        let token = await jwt.sign({userId: userId}, secret, {algorithm: 'HS256'})

        return token
    } catch (e) {
        return e
    }
}

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.cookies.Authentication || req.headers.authorization
        if (token.includes('Bearer')) {
            token = token.split(' ')
            token = token[1]
        }
        let secret = config.jwtSecret
        let decoded = await jwt.verify(token, secret)
        if (!decoded) {
            res.status(401).json({error: 'Credentials invalid!'})
        }
        next()
    } catch (e) {
        res.status(401).json({error: 'Credentials invalid!'})
    }
}

module.exports = {
    generateToken,
    verifyToken,
}

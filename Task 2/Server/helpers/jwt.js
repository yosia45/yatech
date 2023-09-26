const jwt = require('jsonwebtoken')
const accessTokenSecretKey = process.env.JWT_ACCESS_TOKEN
const refreshTokenSecretKey = process.env.JWT_REFRESH_TOKEN

const generateToken = (payload) => {
    return jwt.sign(payload, accessTokenSecretKey, {expiresIn:'1m'})
}
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, refreshTokenSecretKey, {expiresIn:'60m'})
}
const readPayloadFromToken = (token) => {
    return jwt.verify(token, accessTokenSecretKey, (err,decoded)=>{
        if(err){
            return err={
                name:'TokenExpiredError',
                message: 'jwt expire',
            }
        }else{
            return decoded
        }
    })
}

module.exports = {
    generateToken, readPayloadFromToken, generateRefreshToken
}
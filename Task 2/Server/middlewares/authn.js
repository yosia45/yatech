const { readPayloadFromToken } = require('../helpers/jwt')
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {TokenExpiredError} = jwt

const authn = async (req, res, next)=>{
    try {
        const {access_token} = req.headers
        const payload = readPayloadFromToken(access_token)
        // console.log(payload)
        if(payload.name==='TokenExpiredError'){
            throw {name: 'ExpiredToken'}
        }
        const user = await User.findOne({where:{
            username: payload.username
        }})
        if(!user){
            throw {name: "Unauthorized"}
        }
        req.user = {
            username: user.username
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authn
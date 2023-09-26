const express = require('express')
const router = express.Router()
const authn = require('../middlewares/authn')
const UserController = require('../controllers/User-Controller')
const ContentController = require('../controllers/Content-Controller')
const errorHandler = require('../middlewares/errorHandler')

router.get("/",authn,ContentController.getContent)
router.post("/register",UserController.register)
router.post("/login",UserController.login)
router.use(errorHandler)

module.exports=router
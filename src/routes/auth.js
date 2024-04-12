const authController = require("../app/controllers/authController")
const express = require("express")
const route = express.Router()

route.get('/login', authController.login)
route.get('/showUser', authController.showAllUser)
route.post('/register', authController.register)


module.exports = route
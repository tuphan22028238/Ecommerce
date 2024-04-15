const serverController = require('./server')
const authController = require('./auth')
const adminController = require('./admin')
const userController = require('./user')
const {protect, checkRole} = require('../app/middlewares/AuthenciationMiddlevare')

function route(app) {
    app.use('/auth', authController)
    app.use('/admin', protect, checkRole, adminController)
    app.use('/user', protect, userController)
    app.use('/', serverController)
}

module.exports = route
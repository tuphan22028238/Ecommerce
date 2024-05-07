const serverController = require('./server')
const authController = require('./auth')
const adminController = require('./admin')
const userController = require('./user')
const sellerController = require('./seller')
const { protect, checkRole } = require('../app/middlewares/AuthenciationMiddlevare')

function route(app) {
    app.use('/auth', authController)
    app.use('/admin', protect, checkRole, adminController)
    app.use('/user', userController)
    app.use('/seller', sellerController)
    app.use('/', serverController)
}

module.exports = route